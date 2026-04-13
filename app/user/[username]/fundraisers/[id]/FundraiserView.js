"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import NoPost from "../../../../../public/icons/no-data.svg";
import { Header } from "../../../../../components/legacy/Header";
import { Footer } from "../../../../../components/legacy/Footer";
import { TransactionPost } from "../../../../../components/legacy/TransactionPost";
import { FollowPost } from "../../../../../components/legacy/FollowPost";
import { FundraiserPost } from "../../../../../components/legacy/FundraiserPost";
import { RegularPost } from "../../../../../components/legacy/RegularPost";
import { Comentitem } from "../../../../../components/legacy/CommentItem";
import { DonationItem } from "../../../../../components/legacy/DonationItem";
import { Loader } from "../../../../../components/legacy/Loader";
import { useLocale } from "../../../../../context/locale-context";
import { getUniqueComments } from "../../../../../utils";
import translate from "../../../../../translations/post";
import translatePosts from "../../../../../translations/posts";
import { useRouter } from "../../../../../components/legacy/router-shim";

export default function FundraiserView({ err, commentsData, post, language }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState(commentsData || []);
  const [donations, setDonations] = useState([]);
  const [donationStats, setDonationStats] = useState();
  const [loading, setLoading] = useState(false);
  const [commentType, setCommentType] = useState(
    post?.donation ? "donation" : "comments"
  );
  const { asPath, push, locale } = useRouter();
  const { selectedlocale } = useLocale();

  const selectedLang = language?.split(",")[0] || "";
  const enArr = ["en", "en-GB", "en-US"];

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
      return <TransactionPost post={post} />;
    }
    if (post.follows) {
      return <FollowPost post={post} />;
    }
    if (post.donation) {
      return (
        <FundraiserPost post={post} showDetails donationStats={donationStats} />
      );
    }
    return <RegularPost post={post} />;
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
          <main className="mx-auto max-w-md bg-white py-4 relative">
            <div className="px-5 sm:px-4">
              <Header />
            </div>
            <div className="px-5 sm:px-4">
              <p className="font-medium">{translate[locale]?.bitsikaPost}</p>
              <div className="p-3 bg-gray-50 rounded-md my-4">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {translate[locale]?.greyBox}
                </p>
              </div>
              {post && handlePostType(post)}
            </div>
            {post && (
              <div className="bg-[#FAFAFA] py-4 px-5 sm:px-4 mt-4">
                {post.donation ? (
                  <div className="flex">
                    <p
                      onClick={() => setCommentType("donation")}
                      className={classNames(
                        commentType === "donation"
                          ? "bg-gray-200"
                          : "text-gray-400",
                        "font-medium text-sm mb-3 mr-4 py-1 px-2 rounded-lg cursor-pointer"
                      )}
                    >
                      {translate[locale]?.donations}
                    </p>
                    <p
                      onClick={() => setCommentType("comments")}
                      className={classNames(
                        commentType === "comments"
                          ? "bg-gray-200"
                          : "text-gray-700",
                        "font-medium text-sm mb-3 py-1 px-2 rounded-lg cursor-pointer"
                      )}
                    >
                      {translate[locale]?.comments}
                    </p>
                  </div>
                ) : (
                  <p className={classNames("font-medium mb-3")}>
                    {translate[locale]?.comments}
                  </p>
                )}
                {commentType === "comments" ? (
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
                              key={comment.id ?? index}
                              showBottomBorder={index !== comments.length - 1}
                            />
                          ))
                        : null}
                    </InfiniteScroll>
                    {comments?.length === 0 && !loading && (
                      <div className="text-center py-5">
                        <Image src={NoPost} unoptimized alt="no comments" />
                        <p className="text-gray-500">
                          {translatePosts[locale]?.emptyComments}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {donations?.length === 0 && !loading && (
                      <div className="text-center py-5">
                        <Image src={NoPost} unoptimized alt="no donations" />
                        <p className="text-gray-500">
                          {translatePosts[locale]?.emptyDonations}
                        </p>
                      </div>
                    )}
                    <InfiniteScroll
                      dataLength={donations?.length}
                      next={() => setCurrentPage(currentPage + 1)}
                      hasMore={false}
                      loader={
                        donations?.length > 0 &&
                        donations.length < post.comments_count ? (
                          <h3 className="text-gray-300 text-sm text-center">
                            {" "}
                            {translate[locale]?.loading}
                          </h3>
                        ) : null
                      }
                    >
                      {donations
                        ? donations.map((donation, index) => (
                            <DonationItem
                              donation={donation}
                              key={donation.id ?? index}
                              showBottomBorder={index !== donations.length - 1}
                            />
                          ))
                        : null}
                    </InfiniteScroll>
                  </div>
                )}
              </div>
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
