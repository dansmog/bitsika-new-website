import axios from "axios";
import { cache } from "react";
import { headers } from "next/headers";
import SinglePostView from "./SinglePostView";
import { truncateString } from "../../../../../utils";

const getPost = cache(async (postId) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_SOCIAL_URL;
  try {
    const response = await axios.get(
      `${BASE_URL}/public/post/${postId}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "social-api",
        },
      }
    );
    return {
      commentsData: response.data.data,
      post: response.data.post,
      err: null,
    };
  } catch (error) {
    return {
      commentsData: [],
      post: null,
      err: error?.response?.data ?? null,
    };
  }
});

export async function generateMetadata({ params }) {
  const { postId } = await params;
  const { post } = await getPost(postId);

  const title = post
    ? `${post.owner.name} ($${post.owner.username}) on Bitsika`
    : "Page content no longer available";
  const description = post
    ? `${truncateString(post.description, 180)}`
    : "The page you are looking for has moved or doesn’t exist anymore.";
  const image =
    post?.resources?.[0]?.url || post?.owner?.photo_url || undefined;

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

export default async function SinglePostPage({ params }) {
  const { postId } = await params;
  const { commentsData, post, err } = await getPost(postId);
  const hdrs = await headers();
  const language = hdrs.get("accept-language") || "";

  return (
    <SinglePostView
      commentsData={commentsData}
      post={post}
      err={err}
      language={language}
    />
  );
}
