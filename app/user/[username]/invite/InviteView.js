"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Verify from "../../../../public/icons/verified.svg";
import GooglePlay from "../../../../public/icons/googlePlayDownload.svg";
import AppleStore from "../../../../public/icons/applestoreDownload.svg";
import { Header } from "../../../../components/legacy/Header";
import { Footer } from "../../../../components/legacy/Footer";
import { Loader } from "../../../../components/legacy/Loader";
import { useAuth } from "../../../../context/auth-context";
import { useRouter } from "../../../../components/legacy/router-shim";

export default function InviteView({ user }) {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { loginWithGoogleDesktop, checkFirebaseUser, loginUser } = useAuth();

  const authorizeUser = (userDetails) => {
    loginUser(userDetails)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  const handleLoginWithGoogle = async () => {
    localStorage.setItem("auth_clicked", true);
    setLoading(true);
    const result = await loginWithGoogleDesktop();

    checkFirebaseUser(result?.uid).then((username) => {
      localStorage.removeItem("auth_clicked");
      const userDetails = {
        name: result?.displayName,
        firebase_uid: result?.uid,
        email: result?.email,
        username: username,
        referrer: {
          username: user?.username,
          name: user?.name,
          photo_url: user?.photo_url,
          social_verification: user?.social_verification,
        },
      };

      if (Boolean(username)) {
        return authorizeUser(userDetails);
      }
      setLoading(false);
      localStorage.setItem("sika__user", JSON.stringify(userDetails));
      return push("/create-account");
    });
  };

  return (
    <div className="page-style">
      <Header type="auth" />
      <main className="mx-auto max-w-md  bg-white py-4 px-6 sm:px-6 relative">
        <div className="my-3 text-center font-[500] text-[15px] max-w-[319px] mx-auto" />
        <div className="pb-4 pt-2 flex-col justify-center w-full mt-4">
          <div className="w-full text-center flex justify-center gap-3 cursor-pointer">
            <Link
              href="https://play.google.com/store/apps/details?id=africa.bitsika.bitsika_mobile&hl=en_GB&gl=US"
              target="_blank"
            >
              <Image
                src={GooglePlay}
                unoptimized
                alt="Google Play Store link for Bitsika app"
              />
            </Link>
            <Link
              href="https://apps.apple.com/us/app/cheapest-visa-cards-bitsika/id1478570397"
              target="_blank"
            >
              <Image
                src={AppleStore}
                unoptimized
                alt="Apple AppStore link for Bitsika app"
              />
            </Link>
          </div>
        </div>

        {user && (
          <div className="text-center mt-8">
            <div className="flex items-center justify-center">
              <span className="items-center flex justify-center h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src={user?.photo_url}
                  alt="user avatar"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </span>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center">
                <p className="mr-1 text-gray-700">{user?.name}</p>
                {user?.social_verification && (
                  <span className="flex align-middle mr-2">
                    <Image src={Verify} alt="verified" />
                  </span>
                )}
              </div>
              <a className=" text-gray-400 text-sm mr-[4px]">
                ${user?.username}
              </a>
            </div>
            <div className="my-3 text-center font-[400] text-[15px] max-w-[319px] mx-auto">
              <p>
                When registering after downloading the app, make sure to enter
                my username{" "}
                <span className="text-[#2F80ED]">${user?.username}</span> as the
                person who referred you to the app. Bitsika will send me a small
                gift.
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-center">{loading && <Loader />}</div>
        <div className="pb-[250px]"></div>
      </main>
      <Footer />
    </div>
  );
}
