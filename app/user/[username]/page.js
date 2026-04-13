import { headers } from "next/headers";
import UserProfileView from "./UserProfileView";
import { getUserByUsername } from "./_data";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const { user } = await getUserByUsername(username);

  const title = user
    ? `${user.name} ($${user.username}) on Bitsika `
    : "Bitsika";
  const description = user
    ? `See what ${user.name} has been up to on Bitsika`
    : "Bitsika user profile";
  const image = user?.photo_url;

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

export default async function UserPage({ params }) {
  const { username } = await params;
  const { user, err } = await getUserByUsername(username);
  const hdrs = await headers();
  const language = hdrs.get("accept-language") || "";

  return <UserProfileView user={user} err={err} language={language} />;
}
