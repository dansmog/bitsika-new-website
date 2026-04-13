"use client";

import Verify from "../../public/icons/verified.svg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "./router-shim";
import { PostFooter } from "./PostFooter";
import classNames from "classnames";
import { MarkdownAnchor } from "./MarkdownAnchor";
import { PostResource } from "./PostResource";
import { truncateString } from "../../utils";
import TimeAgo from "javascript-time-ago";

export const RegularPost = ({ post, showBottomBorder, timeline, username }) => {
  const router = useRouter();

  const onClickPost = (e) => {
    !router.pathname.includes("/post") &&
      router.push({ pathname: `${username}/post/${post.id}` });
  };

  const onClick = (e) => {
    e.preventDefault();
    if (e.target.href) {
      return router.push(e.target.href);
    }
    onClickPost();
    e && e.stopPropagation();
  };
  const time = new Date(post.created_at);
  const timeAgo =
    router?.locale === "en" ? new TimeAgo("en-US") : new TimeAgo("fr");

  return (
    <div className="flex items-start relative mt-4 cursor-pointer">
      <div className="items-start justify-start relative w-1/6 ">
        <Link href={`/user/${post.owner.username}`}>
          <span className="items-center flex mr-2 h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={post.owner.photo_url}
              height={48}
              width={48}
              objectFit="cover"
              className="rounded-full"
              alt={post.owner.username}
            />
          </span>
        </Link>
      </div>
      <div
        className={classNames(
          showBottomBorder && "border-b border-gray-200",
          "relative pb-3 justify-start w-5/6 ml-[-4px] mb-3"
        )}
        onClick={onClick}
      >
        <div className="flex items-center" onClick={onClick}>
          <div className="flex items-center">
            <div className="flex items-center">
              <a
                className="mr-1 text-gray-700 text-sm"
                href={`/user/${post.owner.username}`}
              >
                {post.owner.name}
              </a>
              {post.owner?.social_verification && (
                <span className="flex align-middle mr-2">
                  <Image src={Verify} alt="logo" />
                </span>
              )}
            </div>
            <a
              className="text-gray-400 text-sm mr-[4px]"
              href={`/${post.owner.username}`}
            >
              ${post.owner.username}
            </a>
            <p className="mr-[4px] text-gray-400 text-sm mt-[1px] mb-0">
              {"•"}
            </p>
            <p className=" text-gray-400 text-sm mb-0">
              {timeAgo.format(new Date(time), "mini")}
            </p>
          </div>
        </div>
        {post.resources?.length > 0 && (
          <PostResource resources={post.resources} />
        )}
        <span className="text-gray-500 text-sm leading-relaxed w-fit">
          <MarkdownAnchor
            markdown={
              timeline
                ? truncateString(post.description, 500)
                : post.description
            }
            onClick={onClick}
            locale={router.locale}
          />
        </span>
        {post.description.length > 500 && timeline && (
          <p className="text-[#2F80ED] text-sm leading-relaxed w-fit mt-1">
            Show full post
          </p>
        )}
        <PostFooter
          time={new Date(post.created_at)}
          comments={post.comments_count}
        />
      </div>
    </div>
  );
};
