"use client";

import Image from 'next/image';
import React from 'react';
import { formatNumber, getCurrency } from '../../utils';

const TradeItem = ({ item, locale }) => {
  const {
    artwork,
    name,
    network,
    currency,
    usd_exchange,
    additional_data
  } = item;

  return (
    <div className="flex items-start py-4 border-b">
      <div className="flex items-center">
        <span className='items-center flex mr-4'>
          <Image src={artwork} alt="logo" objectFit="cover" width={49} height={49} className="rounded-full" />
        </span>
      </div>
      <div className="flex justify-between w-5/6">
        <div className="overflow-auto w-4/6">
          <p className="text-[#000000] text-[15px]">{name} ({network})</p>
          {item.type !== "FIAT" && <p className="text-[#000000] text-[13px]">{getCurrency(usd_exchange?.to)}{usd_exchange?.to !== "USD" ? "1" : formatNumber(usd_exchange?.rate, locale)} {usd_exchange?.to !== "USD" ? <span>≈ {formatNumber(usd_exchange?.rate)} {usd_exchange?.to}</span> : ''} <span className={!additional_data?.percent_change_1h?.toString().includes("-") ? "text-[#2BB015]" : "text-[#EB1D1D]"}>{!additional_data?.percent_change_1h?.toString().includes("-") ? "+" : ""}{formatNumber(additional_data?.percent_change_1h)}%</span></p>}
        </div>
        {/* <div className="w-2/6">
          <p className="text-[#000000] text-[15px] text-right">{amount}</p>
          <p className="text-[#000000] text-[13px] text-right">{usd_amount && getCurrency(currency)}{usd_amount}</p>
        </div> */}
      </div>
    </div>
  )
}

export default TradeItem;