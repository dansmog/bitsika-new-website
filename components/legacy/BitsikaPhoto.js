"use client";

import React from "react";
import Image from 'next/image';
import Bitsika from "../../public/images/bitsika-icon.svg";

export const BitsikaPhoto = ({ height, width }) => {

  return (
    <div className={`w-fit bg-[#fae3b9] flex items-center justify-center p-2 rounded-[16px] `}>
      <Image src={Bitsika} objectFit="contain" height={height} width={width} />
    </div>
  )
}