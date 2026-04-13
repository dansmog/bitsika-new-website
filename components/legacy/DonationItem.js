"use client";


import Verify from "../../public/icons/verified.svg";
import Link from "next/link";
import Image from 'next/image';
import RightArrow from "../../public/icons/right-arrow.svg";
import { useRouter } from './router-shim';
import { PostFooter } from "./PostFooter";
import classNames from "classnames";
import { MarkdownAnchor } from "./MarkdownAnchor";
import { PostResource } from "./PostResource";
import { formatNumber, getCurrency } from "../../utils";
import translate from "../../translations/posts";

export const DonationItem = ({ post, showBottomBorder, donation }) => {
  const router = useRouter();

  const onClickPost = () => {
    !router.pathname.includes("/posts") && router.push({ pathname: `/posts/${post.id}` })
  }

  const onClick = (e) => {
    e.preventDefault()
    if (e.target.href) {
      return router.push(e.target.href)
    }
    // onClickPost && onClickPost();
    e && e.stopPropagation();
  };

  return (
    <div className="flex items-start relative mt-4 cursor-pointer">
      <div className='items-start justify-start relative w-1/6 '>
        <Link href={`/${donation.from_account.username}`}>
          <a>
            <Image src={donation.from_account.photo_url} height={48} width={48} objectFit="cover" className="rounded-[12px]" />
          </a>
        </Link>
      </div>
      <div className={classNames(showBottomBorder && "border-b border-gray-200", "relative pb-3 justify-start w-5/6 ml-[-4px] mb-3")} onClick={onClick}>
        <div className='flex items-center'>
          <div className="flex items-center">
            <a className='mr-1 text-gray-700' href={`/${donation.from_account.username}`}>
              {donation.from_account.name}
            </a>
            {donation.from_account?.social_verification && <span className="flex align-middle mr-2"><Image src={Verify} alt="logo" /></span>}
          </div>
          <a className='text-gray-400 text-sm' href={`/${donation.from_account.username}`}>
            ${donation.from_account.username}
          </a>
        </div>
        <p className='text-gray-500 text-sm leading-relaxed w-fit'>
          <MarkdownAnchor markdown={donation.purpose} onClick={onClick} locale={router.locale} />
          <p className='text-gray-800 text-sm'> {translate[router.locale].donated} {getCurrency(donation.currency)}{formatNumber(donation.amount, router.locale)}</p>
        </p>
        <PostResource resources={donation.resources} />
        <PostFooter time={new Date(donation.created_at)} />
      </div>
    </div>
  )
}