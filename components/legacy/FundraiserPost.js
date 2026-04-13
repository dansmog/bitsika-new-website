"use client";


import Verify from "../../public/icons/verified.svg";
import Link from "next/link";
import Image from 'next/image';
import classNames from "classnames";
import { useRouter } from './router-shim';
import { PostFooter } from "./PostFooter";
import { MarkdownAnchor } from "./MarkdownAnchor";
import { PostResource } from "./PostResource";
import { formatNumber, getCurrency, truncateString } from "../../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import translate from "../../translations/homepage";
import translatePost from "../../translations/posts";
import DummyPhoto from "../../public/images/user.png";

export const FundraiserPost = ({ post, showBottomBorder, showDetails, donationStats, timeline, end, single, username }) => {
  const router = useRouter();
  const [stats, setStats] = useState(donationStats ?? null);

  useEffect(() => {
    !stats && getFundraiserStats();
  }, [post])

  const getFundraiserStats = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL;

    const response = await axios.get(`${BASE_URL}/public/social/donation/statistics?post_id=${post.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-service-name": "transaction-api",
      },
    });

    setStats(response.data)
  }

  const onClickPost = () => {
    !router.pathname.includes("/fundraisers") && router.push({ pathname: `${username}/fundraisers/${post.id}` })
  }
  const percentageWidth = stats?.percentage ? `${stats?.percentage}%` : "0%";

  const onClick = (e) => {
    e.preventDefault()
    if (e.target.href) {
      return router.push(e.target.href)
    }
    onClickPost();
    e && e.stopPropagation();
  };
  const hasPhoto = Boolean(post.owner?.photo_url)

  return (
    <div className="flex items-start relative mt-4 cursor-pointer">
      <div className='items-start justify-start relative w-1/6'>
        <Link href={`/${post.owner.username}`}>
          <span className='items-center flex mr-2 h-12 w-12 rounded-full overflow-hidden'>
            <Image src={hasPhoto ? post.owner.photo_url : DummyPhoto} height={48} width={48} objectFit="cover" className="rounded-full" alt="profile" />
          </span>
        </Link>
      </div>
      <div className={classNames(showBottomBorder && "border-b border-gray-200", "relative pb-3 w-5/6 ml-[-4px] mb-3")} onClick={onClick}>
        <div className='flex items-center justify-between' onClick={onClick}>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center">
                <a className='mr-1 text-gray-700 text-sm' href={`/${post.owner.username}`}>
                  {post.owner.name}
                </a>
                {post.owner?.social_verification && <span className="flex align-middle mr-2"><Image src={Verify} alt="logo" /></span>}
              </div>
              <a className=' text-gray-400 text-sm' href={`/${post.owner.username}`}>
                ${post.owner.username}
              </a>
            </div>
          </div>
          <p className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">{translate[router.locale].posts.fundraising}</p>
        </div>
        {post.resources?.length > 0 && <PostResource resources={post.resources} />}
        <p className='text-gray-800 text-sm mt-2 leading-relaxed w-fit mb-1 font-semibold'>
          {post.title}
        </p>
        <p className='text-gray-500 text-sm mt-1 leading-relaxed w-fit mb-2'>
          <MarkdownAnchor markdown={timeline ? truncateString(post.description, 500) : post.description} onClick={onClick} locale={router.locale} />
        </p>
        {post.description.length > 500 && timeline && <p className='text-blue-500 text-sm leading-relaxed w-fit mt-1'>Show full post</p>}
        {post.donation.link && <span className='text-gray-500 text-sm mt-1 leading-relaxed w-fit mb-2'>
          <MarkdownAnchor markdown={post.donation.link} onClick={onClick} locale={router.locale} />
        </span>}
        {showDetails ?
          <>
            <div className="w-full bg-[#F5F5F5] rounded-[4px] my-3">
              {(stats || donationStats) && <div style={{ width: `${percentageWidth}`, maxWidth: "100%" }} className={"bg-[#27AE60] h-[8.5px] rounded-[4px]"} />}
            </div>
            <div className="flex items-center mt-2 mb-2">
              <p className="bg-green-100 text-green-600 px-1 py-1 text-xs rounded mr-2">{donationStats ? formatNumber(donationStats?.percentage, router.locale) : formatNumber(stats?.percentage, router.locale) ?? 0}%</p>
              <p className="text-sm text-gray-600">{getCurrency(post.donation.currency)}{donationStats ? formatNumber(donationStats?.collected_usd_amount, router.locale) : formatNumber(stats?.collected_usd_amount, router.locale) ?? 0} {translate[router.locale].outOf} {getCurrency(post.donation.currency)}{formatNumber(post.donation.amount, router.locale)} {translatePost[router?.locale].fundRaise}</p>
            </div>
          </>
          :
          <p className="text-xs text-right text-gray-400">
            Click for more details
          </p>
        }
        <PostFooter single={single} time={new Date(post.created_at)} alternate={post.donation.is_active} comments={post.comments_count} donation={post.donation} />
      </div>
    </div>
  )
}