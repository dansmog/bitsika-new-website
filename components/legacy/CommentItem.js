"use client";


import Verify from "../../public/icons/verified.svg";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from './router-shim'
import Ellipsis from "../../public/icons/horizontal-ellipsis.svg";
import classNames from "classnames";
import TimeAgo from 'javascript-time-ago'
import { MarkdownAnchor } from "./MarkdownAnchor";
import { truncateString } from "../../utils";
import { BitsikaPhoto } from "./BitsikaPhoto";
import DummyPhoto from "../../public/images/user.png";

// English.
import en from 'javascript-time-ago/locale/en';
import fr from 'javascript-time-ago/locale/fr';

TimeAgo.addLocale(en)
TimeAgo.addLocale(fr)

export const Comentitem = ({ comment, showBottomBorder }) => {
  const router = useRouter();

  const timeAgo = router?.locale === "en" ? new TimeAgo('en-US') : new TimeAgo('fr')
  const onClick = (e) => {
    e.preventDefault()
    if (e.target.href) {
      return router.push(e.target.href)
    }
    // onClickPost && onClickPost();
    e && e.stopPropagation();
  };
  const time = new Date(comment.created_at)
  const hasPhoto = Boolean(comment.owner?.photo_url)

  return (
    <div className="mt-3 mb-6 flex items-start border-b">
      <div className='items-start justify-start relative w-1/12 mt-1'>
        {comment?.owner?.username !== "--" ?
          <Link href={`/${comment?.owner?.username}`}>
            <span className="items-center flex justify-start h-8 w-8 rounded-full overflow-hidden border">
              <Image src={hasPhoto ? comment.owner.photo_url : DummyPhoto} height={30} width={30} objectFit="cover" className="rounded-full" alt="user" />
            </span>
          </Link>
          : <Link href="/">
            <a>
              <BitsikaPhoto height="24" width="24" />
            </a>
          </Link>
        }
      </div>
      <div className="relative justify-start w-11/12 ml-3">

        <div className="flex items-center">
          <div className='flex items-start justify-between'>
            <div className="flex items-center">
              <div className="flex items-center">
                <a className='mr-1 text-gray-700 text-sm' href={`/${comment?.owner?.username}`}>
                  {truncateString(comment.owner.name, 24)}
                </a>
                {comment.owner?.social_verification && <span className="flex align-middle mr-2"><Image src={Verify} alt="logo" /></span>}
              </div>
              <a className=' text-gray-400 text-sm mr-[4px]' href={`/${comment?.owner?.username}`}>
                ${comment.owner.username}
              </a>
              <p className='mr-[4px] text-gray-400 text-sm mt-[1px] mb-0'>{'•'}</p>
              <p className=' text-gray-400 text-sm mb-0'>
                {timeAgo.format(new Date(time), 'mini')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start relative cursor-pointer">
          <div className={classNames(showBottomBorder && " border-gray-200", "relative pb-3 justify-start w-5/6 ml-[-1px]")} onClick={onClick}>
            <p className='text-gray-600 text-sm leading-relaxed w-fit'>
              <MarkdownAnchor markdown={comment.description} onClick={onClick} locale={router.locale} />
            </p>
            {/* <span className='items-center flex justify-end mr-2'>
          <p className="text-gray-500 text-sm mr-3">{timeAgo.format(new Date(comment.created_at), 'mini')}</p>
          <Image src={Ellipsis} alt="ellipsis" />
        </span> */}
          </div>
        </div >
      </div>
    </div>
  )
}