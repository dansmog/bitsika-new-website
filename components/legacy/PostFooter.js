"use client";

import React from "react";
import Image from 'next/image';
import Message from "../../public/icons/message-icon.svg";
import TimeAgo from 'javascript-time-ago'
import classNames from "classnames";
// English.
import en from 'javascript-time-ago/locale/en';
import fr from 'javascript-time-ago/locale/fr';
import translate from "../../translations/homepage";
import { useRouter } from "./router-shim";
import { formatNumber } from "../../utils";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(fr)

// Create formatter (English).

export const PostFooter = ({ alternate, comments, time, donation, single }) => {
  const { locale } = useRouter();

  const timeAgo = locale === "en" ? new TimeAgo('en-US') : new TimeAgo('fr')
  return (
    <div className={classNames(!isNaN(Number(comments)) ? "justify-between" : "justify-end", "flex mt-1 pt-1")}>
      {!isNaN(Number(comments)) && !single &&
       <div className="flex items-center justify-between">
        <span className='items-center flex justify-start'>
          <Image src={Message} alt="logo" />
        </span>
        <p className="text-gray-400 text-sm ml-1"> {!isNaN(Number(comments)) ? formatNumber(comments, locale) : 12}</p>
      </div>}
      <div className="flex items-center">
        {alternate && !donation.is_closed && donation.is_active && <p className="bg-gray-100 text-gray-400 px-1 py-1 text-xs rounded mr-2">{translate[locale].posts.ongoing}</p>}
        {alternate && donation.is_closed && donation.is_active && <p className="bg-red-100 text-red-400 px-1 py-1 text-xs rounded mr-2">{translate[locale].posts.ended}</p>}
        {/* <span className='items-center flex justify-start mr-2'>
          <Image src={Ellipsis} alt="ellipsis" />
        </span>
        <span className='items-center flex justify-start'>
          <Image src={Bookmark} alt="bookmark" />
        </span> */}
      </div>
    </div>
  );
};

