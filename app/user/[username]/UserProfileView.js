"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Error from "../../../public/images/error.png";
import LinkIcon from "../../../public/icons/sika-link.svg";
import Verify from "../../../public/icons/verified.svg";
import DummyPhoto from "../../../public/images/user.png";
import { Header } from "../../../components/legacy/Header";
import { Footer } from "../../../components/legacy/Footer";
import { MarkdownAnchor } from "../../../components/legacy/MarkdownAnchor";
import { Tabs } from "../../../components/legacy/Tabs";
import { Posts } from "../../../components/legacy/Posts";
import { Loader } from "../../../components/legacy/Loader";
import { useRouter } from "../../../components/legacy/router-shim";
import { useLocale } from "../../../context/locale-context";
import { getUniquePosts } from "../../../utils";

export default function UserProfileView({ user, err, language }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [end, setEnd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ranking, setRanking] = useState();
  const { asPath, push, locale } = useRouter();
  const { selectedlocale } = useLocale();

  const selectedLang = language?.split(",")[0];
  const selectedTab = asPath;
  const enArr = ["en", "en-US", "en-GB"];

  const hasPhoto = Boolean(user?.photo_url);

  useEffect(() => {
    if (selectedLang && !enArr.includes(selectedLang)) {
      push(`${asPath}`);
    }
  }, []);

  useEffect(() => {
    handleTabChange();
  }, [selectedTab, currentPage]);

  useEffect(() => {
    setPosts([]);
    setCurrentPage(1);
    setEnd(true);
    setLoading(true);
    handleTabChange(1);
  }, [user]);

  const getUserPosts = async (page) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_SOCIAL_URL;
    const nextpage = page ? page : currentPage;

    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/public/post/${user?.username}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "social-api",
          Accept: "application/json",
        },
      }
    );
    if (response.data.data?.length < 20) {
      setEnd(false);
    }
    setLoading(false);
    const newPosts = response.data.data;
    newPosts.length > 0 && setPosts(getUniquePosts(posts, newPosts));
  };

  const onSelectTab = (tab) => {
    push(tab.href);
  };

  const handleTabChange = (page) => {
    switch (selectedTab) {
      case `/user/${user?.username}`:
        return !loading && getUserPosts(page);
      default:
        break;
    }
  };

  const toSwitch =
    ["fr", "fr-FR"].includes(selectedLang) &&
    enArr.includes(locale) &&
    !selectedlocale;
  const tabs = [
    {
      name: "Posts",
      href: `/user/${user?.username}`,
      current: false,
      locale: "Posts",
    },
    {
      name: "My Trades",
      href: `/user/${user?.username}/trade`,
      current: false,
      locale: "My Trades",
    },
  ];

  return (
    <div className="page-style bg-[#e4f4ff]" >
      {toSwitch ? (
        <div className="h-screen">
          <div className="mx-auto max-w-md bg-white py-4 relative h-screen pt-40">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main className="mx-auto max-w-md  bg-white py-4 px-6 sm:px-6 relative">
            <div>
              {user ? (
                <>
                  <div className="flex justify-between mt-5 w-full items-center">
                    <span className="items-center flex justify-center h-20 w-20 rounded-full overflow-hidden">
                      <Image
                        src={hasPhoto ? user?.photo_url : DummyPhoto}
                        alt={user?.username}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                    </span>
                  </div>
                  <div className="flex mt-3">
                    <p className="mr-1 text-gray-700 text-sm">{user?.name}</p>
                    {user?.social_verification && (
                      <Image src={Verify} alt="verified" />
                    )}
                  </div>

                  <div className="flex mt-1 items-center">
                    <p className="mr-1 text-gray-400 text-sm">
                      ${user.username}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-600 text-sm mt-2 leading-relaxed">
                      <MarkdownAnchor markdown={user.about} locale={locale} />
                    </span>
                  </div>

                  <div className="flex mt-3">
                    <Image src={LinkIcon} alt="" />
                    <Link
                      href={`/${user?.username}/invite`}
                      className="cursor-pointer"
                    >
                      <p className="text-[#2F80ED] ml-2 cursor-pointer text-sm">
                        Sign-up to Bitsika with my link{" "}
                      </p>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="py-14">
                  <span className="items-center flex justify-center">
                    <Image
                      src={Error}
                      alt="error"
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                  </span>
                  <p className="text-gray-400 px-2 items-center h-fit text-center">
                    {err ? err.message : ""}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-5 relative w-full">
              <Tabs
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={onSelectTab}
                keyToUse="href"
              />
              {user && (
                <Posts
                  posts={posts}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  loading={loading}
                  end={end}
                  username={user?.username}
                />
              )}
            </div>
            <div className="mb-[300px]" />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
