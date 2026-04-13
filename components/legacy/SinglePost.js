"use client";


import Verify from "../../public/icons/verified.svg";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from './router-shim';
import { PostFooter } from "./PostFooter";
import classNames from "classnames";
import { MarkdownAnchor } from "./MarkdownAnchor";
import { PostResource } from "./PostResource";
import { truncateString } from "../../utils";
import TimeAgo from 'javascript-time-ago'
import DummyPhoto from "../../public/images/user.png";

export const RegularSinglePost = ({ post, showBottomBorder, timeline }) => {
  const router = useRouter();

  const onClickPost = (e) => {
    !router.pathname.includes("/posts") && router.push({ pathname: `/posts/${post.id}` })
  }

  const onClick = (e) => {
    e.preventDefault()
    if (e.target.href) {
      return router.push(e.target.href)
    }
    onClickPost();
    e && e.stopPropagation();
  };
  const time = new Date(post.created_at)
  const timeAgo = router?.locale === "en" ? new TimeAgo('en-US') : new TimeAgo('fr')
  const hasPhoto = Boolean(post.owner?.photo_url)

  return (
    <div className="border-b">
      <div className='items-start justify-start relative'>
        <div className="flex items-start">
          <Link href={`/${post.owner.username}`}>
            <span className='items-center flex mr-2 h-12 w-12 rounded-full overflow-hidden'>
              <Image src={hasPhoto ? post.owner.photo_url : DummyPhoto} height={48} width={48} objectFit="cover" className="rounded-full" alt="profile" />
            </span>
          </Link>
          <div className='items-center ml-3' onClick={onClick}>
            <div className="flex items-center">
              <div className="flex items-center">
                <a className='mr-1 text-gray-700 text-sm' href={`/${post.owner.username}`}>
                  {post.owner.name}
                </a>
                {post.owner?.social_verification && <span className="flex align-middle mr-2"><Image src={Verify} alt="logo" /></span>}
              </div>
            </div>
            <div className="flex">
              <a className='text-gray-400 text-sm mr-[4px]' href={`/${post.owner.username}`}>
                ${post.owner.username}
              </a>
              <p className='mr-[4px] text-gray-400 text-sm mt-[1px] mb-0'>{'•'}</p>
              <p className=' text-gray-400 text-sm mb-0'>
                {timeAgo.format(new Date(time), 'mini')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start relative cursor-pointer mt-3">
        <div className={classNames(showBottomBorder && "border-b border-gray-200", "relative pb-3 justify-start")} onClick={onClick}>
          {post.resources?.length > 0 && <PostResource resources={post.resources} />}
          <span className='text-gray-500 text-sm leading-relaxed w-fit'>
            <MarkdownAnchor markdown={timeline ? truncateString(post.description, 500) : post.description} onClick={onClick} locale={router.locale} />
          </span>
          {post.description.length > 500 && timeline && <p className='text-blue-500 text-sm leading-relaxed w-fit mt-1'>Show full post</p>}
        </div>
      </div>

    </div>
  )
}