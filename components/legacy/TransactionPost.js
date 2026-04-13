"use client";

import Verify from "../../public/icons/verified.svg";
import RightArrow from "../../public/icons/right-arrow.svg";
import Link from "next/link";
import Image from 'next/image';
import { PostFooter } from "./PostFooter";
import classNames from "classnames";
import { useRouter } from './router-shim';
import { MarkdownAnchor } from "./MarkdownAnchor";
import { PostResource } from "./PostResource";
import DummyPhoto2 from "../../public/images/dummy-photo-2.svg";
import { formatNumber } from "../../utils";
import TimeAgo from 'javascript-time-ago'
import DummyPhoto from "../../public/images/user.png";

export const TransactionPost = ({ post, showBottomBorder, username }) => {
  const router = useRouter();

  const onClickPost = (e) => {
    !router.pathname.includes("/post") && router.push({ pathname: `${username}/post/${post.id}` })
  }

  const handleChildClick = (username, e) => {
    router.push({ pathname: `/${username}` })
    e && e.stopPropagation();
  };

  const onClick = (e) => {
    e.preventDefault()
    if (e.target.href) {
      return router.push(e.target.href)
    }
    onClickPost();
    e && e.stopPropagation();
  };

  const hasPhoto = Boolean(post.owner?.photo_url)

  const time = new Date(post.created_at)
  const timeAgo = router?.locale === "en" ? new TimeAgo('en-US') : new TimeAgo('fr')
  return (
    <div className="flex items-start relative mt-4 cursor-pointer">
      <div className='items-start justify-start relative w-1/6'>
        <span onClick={(e) => handleChildClick(post.owner.username, e)}>
          <a>
            <Image src={hasPhoto ? post.owner.photo_url : DummyPhoto} height={48} width={48} objectFit="cover" className="rounded-[12px]" alt="profile" />
          </a>
        </span>
      </div>
      <div className={classNames(showBottomBorder && "border-b border-gray-200", "relative pb-3 w-5/6 ml-[-4px] mb-3")} onClick={onClick}>
        <div className='flex items-center' onClick={onClick}>
          <div className="flex items-center">
            <div className="flex items-center">
              <a className='mr-1 text-gray-700 text-sm' href={`/${post?.owner?.username}`}>
                {post.owner.name}
              </a>
              {post.owner?.social_verification && <span className="flex align-middle mr-2"><Image src={Verify} alt="logo" /></span>}
            </div>
            <a className='text-gray-400 text-sm mr-[4px]' href={`/${post?.owner?.username}`}>
              ${post?.owner?.username}
            </a>
            <p className='mr-[4px] text-gray-400 text-sm mt-[1px] mb-0'>{'•'}</p>
            <p className=' text-gray-400 text-sm mb-0'>
              {timeAgo.format(new Date(time), 'mini')}
            </p>
          </div>
        </div>
        {post.resources?.length > 0 && <PostResource resources={post.resources} />}
        <span className='text-gray-500 text-sm mt-1 leading-relaxed w-fit'>
          <MarkdownAnchor markdown={post.description} onClick={onClick} locale={router.locale} />
        </span>
        <div className="bg-[#F9F9F9] flex p-3 rounded-md justify-evenly items-center my-3">
          <div className="relative text-center">
            <span onClick={(e) => handleChildClick(post.transaction?.from_account?.username, e)}>
              <a>
                {post.transaction?.from_account ? <Image src={post.transaction?.from_account?.photo_url} alt="dummy-photo" height={45} width={45} objectFit="cover" className="rounded-[16px]" />
                  : <Image src={post.owner.photo_url} alt="dummy-photo" height={45} width={45} objectFit="cover" className="rounded-[16px]" />}
                <p className='text-gray-400 text-xs pt-1'>
                  ${post.transaction?.from_account?.username ?? post?.owner?.username}
                </p>
              </a>
            </span>
          </div>
          <div className="flex-col justify-between text-center mt-2">
            <Image src={RightArrow} alt="dummy-photo" objectFit="contain" />
            <p className='text-gray-700 text-xs mt-4'>
              {post.transaction.currency} {formatNumber(post.transaction.amount, router.locale)}
            </p>
          </div>
          <div className="relative flex-col text-center">
            <span onClick={(e) => handleChildClick(post.transaction?.to_account?.username, e)}>
              <a>
                {post.transaction?.to_account ? <Image src={post.transaction?.to_account.photo_url} alt="dummy-photo" height={45} width={45} objectFit="cover" className="rounded-[16px]" />
                  :
                  <Image src={DummyPhoto2} alt="dummy-photo" height={45} width={45} objectFit="contain" />}
                <p className='text-gray-400 text-xs'>
                  ${post.transaction?.to_account ? post.transaction?.to_account?.username : "amalasky"}
                </p>
              </a>
            </span>
          </div>
        </div>
        <PostFooter time={new Date(post.created_at)} comments={post.comments_count} />
      </div >
    </div >
  )
}