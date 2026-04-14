import { Header } from "../../components/legacy/Header";
import { Footer } from "../../components/legacy/Footer";
import metaTranslate from "../../translations/meta";

const LOCALE = "en";

export function generateMetadata() {
  const title = metaTranslate[LOCALE].delete.title;
  const description = metaTranslate[LOCALE].delete.description;
  const image = metaTranslate[LOCALE].download.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, width: 1200, height: 600 }],
    },
    twitter: {
      card: "summary",
      site: "@atsudavoh",
      creator: "@atsudavoh",
      title,
      description,
      images: [image],
    },
  };
}

export default function DeleteAccountPage() {
  return (
    <div className="page-style">
      <Header />
      <main className="mx-auto max-w-md bg-white py-4 px-6 sm:px-6 relative">
        <div className="my-3 text-center font-[400] text-[15px] max-w-[330px] mx-auto" />
        <div>
          <p className="font-[500]">Delete Your Bitsika Account</p>

          <p className="mt-4">
            Each Bitsika user is entitled to request the deletion of their
            account from our database. Upon requesting the deletion of your
            account, we will remove all associated transactions, images, posts,
            and friend connections from our system.
          </p>
          <p className="mt-4">
            Prior to permanent deletion, we will package your data into a zip
            file and send it to you via email.
          </p>
          <p className="mt-4">The process for deleting your account is straightforward:</p>
          <p className="mt-4">
            1. Please send a brief email to{" "}
            <a href="mailto:info@bitsika.africa">info@bitsika.africa</a>{" "}
            requesting the deletion of your account, including the reason for
            your decision.
          </p>
          <p className="mt-4">
            2. Ensure that the email is sent from the same address linked to
            your Bitsika account.
          </p>
          <p className="mt-4">
            3. We will respond promptly (within 3 business days) with a link to
            download your data and proceed with the deletion of your account.
          </p>
          <p className="mt-4">
            For further inquiries or reports, please feel free to reach out to
            us at <a href="mailto:info@bitsika.africa">info@bitsika.africa</a>.
            Our support team is here to assist you.
          </p>
        </div>
        <div className="mb-[250px]" />
      </main>
      <Footer />
    </div>
  );
}
