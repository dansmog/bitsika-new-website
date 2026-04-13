"use client";

import { useEffect, useState } from 'react';
import NoPost from "../../public/icons/empty-box.png";
import Image from 'next/image';
import { TransactionPost } from './TransactionPost';
import { FollowPost } from './FollowPost';
import { RegularPost } from './RegularPost';
import { FundraiserPost } from './FundraiserPost';
import { Loader } from './Loader';
import ScrollComponent from './ScrollComponent';
import { useRouter } from './router-shim';
import translate from "../../translations/posts";

export const Posts = ({ posts, currentPage, setCurrentPage, loading, end, username }) => {
  const { locale } = useRouter();

  const handlePostType = (post, index) => {
    if (post.transaction) {
      return <TransactionPost post={post} key={Math.random(12 * 483984)} showBottomBorder={index !== posts.length - 1} username={username} />
    }
    if (post.follows) {
      return <FollowPost post={post} key={Math.random(12 * 4854584)} showBottomBorder={index !== posts.length - 1} username={username} />
    }
    if (post.donation) {
      return <FundraiserPost post={post} key={Math.random(12 * 48344)} showBottomBorder={index !== posts.length - 1} showDetails timeline end username={username} />
    }
    return <RegularPost post={post} key={Math.random(12 * 443984)} showBottomBorder={index !== posts.length - 1} timeline username={username} />
  }

  return (
    <div>
      <ScrollComponent
        loadData={() => {
          end && posts?.length > 0 && setCurrentPage(currentPage + 1);
        }}
      >
        <div>
          {posts?.length > 0 ? posts.map((post, index) => (
            handlePostType(post, index)
          )) : null}
          {loading &&
            <div className='py-12 mt-12'>
              <Loader />
            </div>}
        </div>
      </ScrollComponent>
      {posts?.length === 0 && !loading &&
        <div className='flex py-5 flex-col items-center justify-center'>
          <Image src={NoPost} height={90} width={90} unoptimized alt="empty" />
          <p className='text-gray-500 mt-3 text-sm'>{translate[locale].allPosts}</p>
        </div>
      }
    </div>
  )
}