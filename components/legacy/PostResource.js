"use client";


import Image from 'next/image';

export const PostResource = ({ resources = [] }) => {

  const renderResource = (resource) => {
    if (resource.type === "image") {
      return (
        <div className='' key={resource.url}>
          <img
            alt='post'
            key={resource.url}
            src={resource.url}
            className="rounded-[10px] bg-gray-100 border-gray-300 w-full"
            layout="responsive"
          />
        </div>
      )
    }
  }

  return (
    <div className="mt-4 mb-4">
      {resources.map(resource => renderResource(resource))}
    </div>
  )
}