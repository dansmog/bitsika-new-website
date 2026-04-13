import InviteView from "./InviteView";
import { getUserByUsername } from "../_data";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const { user } = await getUserByUsername(username);

  const title = `Download Bitsika with ${user?.name ?? username}'s link`;
  const description = "Download Bitsika and sign up using my referral link.";
  const image = user?.photo_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
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

export default async function InvitePage({ params }) {
  const { username } = await params;
  const { user } = await getUserByUsername(username);

  return <InviteView user={user} />;
}
