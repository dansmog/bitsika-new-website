"use client";


import Verify from "../../public/icons/verified.svg";
import Link from "next/link";
import Image from 'next/image';
import RightArrow from "../../public/icons/right-arrow.svg";
import classNames from "classnames";
import { PostFooter } from "./PostFooter";
import { useRouter } from './router-shim';
import { BitsikaPhoto } from './BitsikaPhoto';
import { truncateString } from "../../utils";
import Bitsika from "../../public/images/bitsika-icon.svg";
import translate from "../../translations/homepage";
import TimeAgo from 'javascript-time-ago'
import DummyPhoto from "../../public/images/user.png";

export const SingleFollowPost = ({ post, showBottomBorder }) => {
  const router = useRouter();

  const onClickPost = () => {
    localStorage.setItem("post", JSON.stringify(post))
    !router.pathname.includes("/posts") && router.push({ pathname: `/posts/${post.id}` })
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
    <div className="border-b">
      <div className="flex">
        <div className='items-start justify-start relative w-1/6 '>
          <Link href={`/${post.owner.username}`}>
            <span className='items-center flex mr-2 h-12 w-12 rounded-full overflow-hidden'>
              <Image src={hasPhoto ? post.owner.photo_url : DummyPhoto} height={48} width={48} objectFit="cover" className="rounded-full" alt="profile" />
            </span>
          </Link>
        </div>
        <div>
          <div className='flex items-center' onClick={onClick}>
            <div className="flex items-center">
              <div className="flex items-center">
                <a className='mr-1 text-gray-700 text-sm' href={`/${post.owner.username}`}>
                  {post.owner.name}
                </a>
                {post.owner?.social_verification && <span className="flex align-middle mr-2"><Image src={Verify} alt="logo" /></span>}
              </div>
            </div>
          </div>
          <div className="flex">
            <a className=' text-gray-400 text-sm mr-[4px]' href={`/${post.owner.username}`}>
              ${post.owner.username}
            </a>
            <p className='mr-[4px] text-gray-400 text-sm mt-[1px] mb-0'>{'•'}</p>
            <p className=' text-gray-400 text-sm mb-0'>
              {timeAgo.format(new Date(time), 'mini')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start relative mt-4 cursor-pointer" >
        <div className={classNames(showBottomBorder && "border-b border-gray-200", "relative pb-3 w-full ml-[-4px] mb-3")} onClick={onClick}>
          <div className="flex mb-3">
            <p className='text-gray-500 text-sm mt-1 leading-relaxed w-fit mr-1' onClick={onClick}>{translate[router?.locale].posts.followPostAction}</p>
            <a href={`/${post.follows.username}`} className="text-[#2F80ED] text-sm mt-1 leading-relaxed w-fit">
              ${post.follows.username}
            </a>
          </div>
          <span onClick={(e) => post.follows.username && handleChildClick(post.follows.username, e)}>
            <div className="bg-[#F9F9F9] flex p-3 rounded-md cursor-pointer">
              <div className="mr-3 relative w-1/6 flex justify-center items-start">
                {post.follows.photo_url ?
                  <span className='items-center flex justify-center h-12 w-12 rounded-full overflow-hidden'>
                    <Image src={post.follows.photo_url ?? Bitsika} alt="dummy-photo" height={55} width={55} objectFit="cover" className="rounded-full" />
                  </span>
                  : <Link href="/">
                    <a>
                      <BitsikaPhoto height="32" width="32" />
                    </a>
                  </Link>
                }
              </div>
              <div className="w-5/6 ml-[-5px]">
                <div className="flex">
                  <p className='mr-1 text-gray-700 text-xs'>
                    {post.follows.name ?? "Bitsika"}
                  </p>
                  <p className='text-gray-400 text-xs mr-1'>
                    ${post.follows.username ?? "bitsika"}
                  </p>
                  {post.follows.social_verification && <Image src={Verify} alt="logo" />}
                </div>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed w-fit">{post.follows.about ? truncateString(post.follows.about, 30)
                  : ``}
                </p>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}