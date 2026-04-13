"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import { Comentitem } from "../../../../../components/legacy/CommentItem";
import { Footer } from "../../../../../components/legacy/Footer";
import { FundraiserPost } from "../../../../../components/legacy/FundraiserPost";
import { Header } from "../../../../../components/legacy/Header";
import { Loader } from "../../../../../components/legacy/Loader";
import { SingleFollowPost } from "../../../../../components/legacy/SingleFollowPost";
import { RegularSinglePost } from "../../../../../components/legacy/SinglePost";
import { TransactionPost } from "../../../../../components/legacy/TransactionPost";
import { useLocale } from "../../../../../context/locale-context";
import NoPost from "../../../../../public/icons/empty-box.png";
import ErrorImg from "../../../../../public/images/error.png";
import translate from "../../../../../translations/post";
import translatePosts from "../../../../../translations/posts";
import { getUniqueComments } from "../../../../../utils";
import { useRouter } from "../../../../../components/legacy/router-shim";

export default function SinglePostView({
  err,
  commentsData,
  post,
  language,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState(commentsData || []);
  const [donations, setDonations] = useState([]);
  const [donationStats, setDonationStats] = useState();
  const [loading, setLoading] = useState(false);
  const [commentType, setCommentType] = useState(
    post?.donation ? "donation" : "comments"
  );
  const { push, asPath, locale } = useRouter();
  const { selectedlocale } = useLocale();

  const selectedLang = language?.split(",")[0];
  const enArr = ["en", "en-US", "en-GB"];

  useEffect(() => {
    if (selectedLang && !enArr.includes(selectedLang)) {
      push(`${asPath}`);
    }
  }, []);

  useEffect(() => {
    getMoreComments();
  }, [currentPage]);

  useEffect(() => {
    if (post?.donation) {
      getFundraiserDetails();
      getDonations();
    }
  }, [post]);

  const handlePostType = (post) => {
    if (post.transaction) {
      return <TransactionPost post={post} single />;
    }
    if (post.follows) {
      return <SingleFollowPost post={post} single />;
    }
    if (post.donation) {
      return (
        <FundraiserPost
          post={post}
          showDetails
          donationStats={donationStats}
          single
        />
      );
    }
    return <RegularSinglePost post={post} single />;
  };

  const getFundraiserDetails = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL;

    const response = await axios.get(
      `${BASE_URL}/public/social/donation/statistics?post_id=${post?.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "transaction-api",
        },
      }
    );

    setDonationStats(response.data);
  };

  const getDonations = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL;
    setLoading(true);
    const response = await axios.get(
      `${BASE_URL}/public/social/donation?post_id=${post?.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "transaction-api",
        },
      }
    );
    setLoading(false);

    setDonations(response.data.data);
  };

  const getMoreComments = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_SOCIAL_URL;
    setLoading(true);

    const response = await axios.get(
      `${BASE_URL}/public/post/${post?.id}/comments?page=${currentPage}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-service-name": "social-api",
        },
      }
    );
    setLoading(false);

    const newComments = response.data.data;
    const sortedData = getUniqueComments(comments, newComments);
    return setComments(sortedData);
  };

  const toSwitch =
    ["fr", "fr-FR"].includes(selectedLang) &&
    enArr.includes(locale) &&
    !selectedlocale;

  return (
    <div className="page-style">
      {toSwitch ? (
        <div className="h-screen">
          <div className="mx-auto max-w-md bg-white py-4 relative h-screen pt-40">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main className="mx-auto max-w-md bg-white py-4 relative">
            <div className="px-6 sm:px-6 py-5">
              {post && handlePostType(post)}
            </div>
            {post ? (
              <div className="py-4 px-6 sm:px-6">
                {post.donation ? (
                  <div className="flex">
                    <p
                      onClick={() => setCommentType("donation")}
                      className={classNames(
                        commentType === "donation"
                          ? "bg-gray-200"
                          : "text-gray-400",
                        "font-medium text-sm mb-1 mr-4 py-1 px-2 rounded-lg cursor-pointer "
                      )}
                    >
                      {donations?.length} {translate[locale]?.donations}
                    </p>
                    <p
                      onClick={() => setCommentType("comments")}
                      className={classNames(
                        commentType === "comments"
                          ? "bg-gray-200"
                          : "text-gray-700",
                        "font-medium text-sm mb-1 py-1 px-2 rounded-lg cursor-pointer"
                      )}
                    >
                      {comments?.length} {translate[locale]?.comments}
                    </p>
                  </div>
                ) : (
                  comments?.length > 0 && (
                    <p
                      className={classNames(
                        "font-medium mb-1 text-[#2F80ED] text-sm"
                      )}
                    >
                      {comments?.length} {translate[locale]?.comments}
                    </p>
                  )
                )}
                <div>
                  <InfiniteScroll
                    dataLength={comments?.length}
                    next={() => setCurrentPage(currentPage + 1)}
                    hasMore={comments.length < (post.comments_count ?? 0)}
                    loader={
                      comments?.length > 0 &&
                      comments.length < post.comments_count ? (
                        <h3 className="text-gray-300 text-sm text-center">
                          {" "}
                          {translate[locale]?.loading}
                        </h3>
                      ) : null
                    }
                  >
                    {comments
                      ? comments.map((comment, index) => (
                          <Comentitem
                            comment={comment}
                            key={comment.id}
                            showBottomBorder={index !== comments.length - 1}
                          />
                        ))
                      : null}
                  </InfiniteScroll>
                  {comments?.length === 0 && !loading && (
                    <div className="flex py-5 flex-col items-center justify-center">
                      <Image
                        src={NoPost}
                        height={90}
                        width={90}
                        unoptimized
                        alt="no comments"
                      />
                      <p className="text-gray-500 mt-3 text-sm">
                        {translatePosts[locale]?.emptyComments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-14 pt-6 flex flex-col justify-center items-center">
                <span className="items-center flex justify-center">
                  <Image
                    src={ErrorImg}
                    alt="error"
                    width={175}
                    height={175}
                    className="rounded-lg object-cover"
                  />
                </span>
                <p className="text-gray-400 px-2 items-center h-fit text-center">
                  {err
                    ? "The page you are looking for has moved or doesn’t exist anymore."
                    : ""}
                </p>
                <div
                  className={classNames(
                    "w-fit bg-[#2F80ED1A] py-[5px] px-3 rounded-[22px] text-center mt-5"
                  )}
                  onClick={() => push("/")}
                >
                  <p className="text-[12px] cursor-pointer text-[#2F80ED] font-[500]">
                    Go back to Home
                  </p>
                </div>
              </div>
            )}
            <div className={post ? "mb-[250px]" : "mb-[5px]"} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
