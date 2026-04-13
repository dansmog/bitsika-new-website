import axios from "axios";
import { cache } from "react";
import { headers } from "next/headers";
import FundraiserView from "./FundraiserView";
import {
  formatNumber,
  truncateString,
} from "../../../../../utils";

const getFundraiser = cache(async (id) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_SOCIAL_URL;
  const TRANSACTION_BASE_URL = process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL;

  try {
    const [response, response2] = await Promise.all([
      axios.get(`${BASE_URL}/public/post/${id}/comments`, {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "social-api",
        },
      }),
      axios.get(
        `${TRANSACTION_BASE_URL}/public/social/donation/statistics?post_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-service-name": "transaction-api",
          },
        }
      ),
    ]);

    return {
      commentsData: response.data.data,
      post: response.data.post,
      stats: response2.data,
      err: null,
    };
  } catch (error) {
    return {
      commentsData: [],
      post: null,
      stats: null,
      err: error?.response?.data ?? null,
    };
  }
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { post, stats } = await getFundraiser(id);

  const locale = "en";
  const title = post
    ? post.donation
      ? `Fundraiser (${formatNumber(stats?.percentage, locale)}%) by $${
          post.owner.username
        } - ${
          post.title
            ? truncateString(post.title, 100)
            : truncateString(post.description, 100)
        }`
      : `Post by $${post.owner.username} - ${truncateString(
          post.description,
          100
        )}`
    : "Bitsika post";
  const description = `${post?.description ?? ""} - Support this fundraiser on Bitsika.`;
  const image = post?.resources?.[0]?.url || post?.owner?.photo_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: "https://bitsika.com/",
      images: image
        ? [{ url: image, width: 150, height: 150 }]
        : undefined,
    },
    twitter: {
      card: "summary",
      site: "@atsudavoh",
      creator: "@atsudavoh",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function FundraiserPage({ params }) {
  const { id } = await params;
  const { commentsData, post, err } = await getFundraiser(id);
  const hdrs = await headers();
  const language = hdrs.get("accept-language") || "";

  return (
    <FundraiserView
      commentsData={commentsData}
      post={post}
      err={err}
      language={language}
    />
  );
}
