"use client";

import React from "react";
import Link from "next/link";

export const MarkdownAnchor = ({ markdown, onClick, locale }) => {

  const createMarkup = (word) => {

    const regex = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\\=]*)/)
    const result = regex.test(word);

    const nameregex = new RegExp(/^[$]/)
    const nameResult = nameregex.test(word);

    const hashregex = new RegExp(/^[#]/)
    const hashResult = hashregex.test(word);

    const actualURl = word.split(" ").map(item => {
      const res = regex.test(item)
      if (res) return item
    })

    const username = word.split(" ").map(item => {
      const res = nameregex.test(item)
      if (res) return item
    })

    const hashtag = word.split(" ").map(item => {
      const res = hashregex.test(item)
      if (res) return item
    })

    const base = locale === "en" ? "/" : `/${locale}/`
    if (result) {
      return (
        `<a href="${actualURl.join("")}" class="text-[#2F80ED]" target="_blank" rel="noreferrer">
            ${`${word} `}
          </a>`
      )
    }
    if (nameResult) {
      return (
        `<a href="${base}${username[0].substring(1)}" class="text-[#2F80ED]">
            ${`${word} `}
          </a>`
      )
    }
    if (hashResult) {
      return (
        `<a href="${base}tags/${hashtag[0].substring(1)}" class="text-[#2F80ED]">
            ${`${word} `}
          </a>`
      )
    }
    return (`<span class="text-gray-600">
      ${`${word}`}
    </span>`)

  }

  let stringArray = markdown.replaceAll("\n", `</br>`).split(" ").join(" ").split(" ");

  return (
    <span className="text-sm mt-2 leading-relaxed">
      <div dangerouslySetInnerHTML={{ __html: stringArray.map((word) => createMarkup(word)).join(" ") }} onClick={onClick && onClick} />
    </span>
  );
}
