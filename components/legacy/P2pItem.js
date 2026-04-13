"use client";

import axios from "axios";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Modal } from "./Modal";
import Instant from "../../public/icons/history.svg";
import NotVerified from "../../public/icons/beginner-thumbs-small.svg";
import History from "../../public/icons/rewind.svg";
import Thumbs from "../../public/icons/thumbs-up.svg";
import TimeIcon from "../../public/icons/time-icon.svg";
import UnverifiedBig from "../../public/icons/beginner-thumbs-big.svg";
import VerifiedBig from "../../public/icons/verified-big.svg";
import { formatCryptoNumber } from '../../utils';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import DummyPhoto from "../../public/images/user.png";

TimeAgo.addLocale(en)
dayjs.extend(relativeTime)

const P2PItem = ({ trade, onClickItem }) => {
  const [verified, setVerified] = useState(false)
  const [time, setTime] = useState(false)
  const [history, setHistory] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [ownerStats, setOwnerStats] = useState();

  const handleCloseModal = () => {
    if (verified) {
      setVerified(false)
    } else if (time) {
      setTime(false)
    } else {
      setHistory(false)
    }
  }

  const openVerified = (e) => {
    e.preventDefault()
    setVerified(true)
  }

  const openTime = (e) => {
    e.preventDefault()
    setTime(true)
  }

  const openHistory = (e) => {
    setHistory(true)
    getOwnerStats()
  }

  const handleClickitem = (e) => {
    e.preventDefault()
    if (e.target.href || e.target.ariaLabel) {
      return;
    }
    onClickItem && onClickItem(trade?.owner?.username, trade.short_code)
    e && e.stopPropagation();
  }

  const getOwnerStats = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_TRADE_BASE_URL;

    setIsLoading(true);
    const response = await axios.get(`${BASE_URL}/public/trades/stats/trader?username=${trade?.owner.username}`, {
      headers: {
        "Content-Type": "application/json",
        // "x-service-name": "transaction-api",
        "Accept": "application/json"
      },
    });

    setIsLoading(false)
    setOwnerStats(response.data)
  }

  const timeAgo = new TimeAgo('en-US');

  const buy_currency_details = trade?.buy_currency_details;
  const sell_currency_details = trade?.sell_currency_details;
  const method_details = trade?.method_details;
  const ownerVerified = trade?.owner?.trade_verification
  const verifiedTxt = ownerVerified ? `$${trade?.owner?.username}  is a verified trader on Bitsika, endorsed for trust, speedy delivery, and reliability. `
    : `Beginner sellers are in the process of gaining experience while serving buyers on Bitsika. Just like any other purchase made on the app, funds spent on transactions with Beginner sellers are held in escrow until a Trade Request is successfully completed. Your funds are always secure, and the Bitsika support and dispute team is available to assist you whenever needed.`
  const verifiedIcon = ownerVerified ? VerifiedBig : UnverifiedBig;

  function isOnline(date) {
    const theDateTime = new Date() - new Date(date)
    if (theDateTime < 60000) {
      return "Online";
    }
    return `Seen ${dayjs(date).fromNow()}`
  }

  function getTimeTxt() {
    if (buy_currency_details?.type === "CRYPTO" && sell_currency_details.type === "CRYPTO") {
      return {
        header: "Instant Purchase",
        description: "Crypto-to-Crypto trade purchases are instantly sold and delivered directly to your wallet. The crypto being sold by this seller has already been securely stored and placed in escrow.",
        btnText: "Instant",
      }
    }
    if (!trade?.owner?.trade_online) {
      return {
        header: "Trader is offline",
        description: "This trader is currently unavailable for trades, possibly due to reasons such as sleep, travel, or other commitments. While their services are temporarily inactive, feel free to explore other traders on the platform for your transactions. Check back later to see if this trader has resumed active status.",
        btnText: "Trader is offline",
      }
    }
    if ((buy_currency_details?.type !== "CRYPTO" || sell_currency_details.type !== "CRYPTO") && trade?.owner?.trade_online) {
      return {
        header: `Seen ${dayjs(trade?.owner.last_seen).fromNow()}`,
        description: `This seller was last seen on the Bitsika app ${dayjs(trade?.owner.last_seen).fromNow()}. Last seen times assist in identifying sellers available for service, minimizing time wastage. In Bitsika trade purchases, the crypto amount is always securely stored and held in escrow.`,
        btnText: isOnline(trade?.owner.last_seen),
      }
    }
  }

  const { header, description, btnText } = getTimeTxt();

  const hasPhoto = Boolean(trade?.owner?.photo_url)
  return (
    <>
      {/**verification modal */}
      {verified && <Modal open={true} openModal={(value) => handleCloseModal(value)} containerClass="w-11/12 sm:w-3/12 px-0 sm:p-0">
        <div className='border-b text-center'>
          <p className='text-[#2F80ED] font-semibold text-sm py-[19px]'>{ownerVerified ? `$${trade?.owner?.username} is a Verified Trader` : `$${trade?.owner?.username} is a Beginner Trader`}</p>
        </div>
        <div className='items-center flex justify-center p-5'>
          <Image src={verifiedIcon} alt="verification" style={{ objectFit: "cover" }} width={75} height={75} className="" aria-label={trade?.owner?.name} />
        </div>
        <div className='px-5 pb-12 sm:px-12 sm:pb-14 pt-2 text-center'>
          <p className='text-sm'>{verifiedTxt}</p>
        </div>
      </Modal>}

      {/**instant purchase modal */}
      {time && <Modal open={true} openModal={(value) => handleCloseModal(value)} containerClass="w-11/12 sm:w-3/12 px-0 sm:p-0">
        <div className='border-b text-center'>
          <p className='text-[#2F80ED] font-semibold text-sm py-[19px]'>{header}</p>
        </div>
        <div className='items-center flex justify-center p-5'>
          <Image src={TimeIcon} alt="verification" style={{ objectFit: "cover" }} width={75} height={75} className="" aria-label={trade?.owner?.name} />
        </div>
        <div className='px-5 pb-12 sm:px-12 sm:pb-14 pt-2 text-center'>
          <p className='text-sm'>{description}</p>
        </div>
      </Modal>}

      {/** trade history modal */}
      {history && <Modal open={true} openModal={(value) => handleCloseModal(value)} containerClass="w-11/12 sm:w-3/12 px-0 sm:p-0">
        <div className='border-b text-center'>
          <p className='text-[#2F80ED] font-semibold text-sm py-[19px]'>{`${trade?.owner?.username}'s Seller History`}</p>
        </div>
        <div className='px-10 py-10'>
          <div className='flex justify-between border-b py-2'>
            <p className='text-[#2F80ED]'>Joined Bitsika P2P</p>
            <p>{ownerStats && new Date(ownerStats?.registered_on).toDateString()}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p className='text-[#2F80ED]'>All time - Number of Successful <br /> trades as seller</p>
            <p>{ownerStats?.total_completed_trades}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p className='text-[#2F80ED]'>All time — Number of unique buyers successfully <br />  served as seller</p>
            <p>{ownerStats?.total_completed_trade_requests_unique_buyers}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p className='text-[#2F80ED]'>Last 30 days — Number of <br /> successful trades as seller</p>
            <p>{ownerStats?.total_completed_trades_last_30}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p className='text-[#2F80ED]'>Last 30 days  — Number of unique <br /> buyers successfully served as seller</p>
            <p>{ownerStats?.total_completed_trade_requests_unique_buyers_last_30}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p className='text-[#2F80ED]'>Last successful sale</p>
            <p>{ownerStats && timeAgo.format(new Date(ownerStats?.last_completed_trade_request_made))}</p>
          </div>
        </div>
      </Modal>}

      <div className="bg-[#F5F6FD] py-6 rounded-[25px] mb-5 cursor-pointer w-full" onClick={handleClickitem}>
        <Link href={`/user/${trade?.owner?.username}`}>
          <div className="flex items-center border-b border-b-[#DDDDDD] pb-2 px-4" aria-label={trade?.owner?.username}>
            <span className='items-center flex mr-2 h-8 w-8 rounded-full overflow-hidden'>
              <Image src={hasPhoto ? trade?.owner?.photo_url : DummyPhoto} alt="user" style={{ objectFit: "cover" }} width={40} height={40} className="" aria-label={trade?.owner?.name} />
            </span>
            <p className="text-[#000000]" aria-label={trade?.owner?.username}>{trade?.owner?.name} <span className="text-gray-400" aria-label={trade?.owner?.name}>${trade?.owner?.username}</span></p>
          </div>
        </Link>
        <div className='overflow-auto no-scrollbar px-4'>
          <div className="flex mt-3 gap-2 w-max">
            {<div className="border border-[#EAEAEA] px-3 py-1 bg-[#FFFFFF] rounded-[11px] flex items-center" onClick={openVerified} aria-label='verification'>
              <Image src={ownerVerified ? Thumbs : NotVerified} alt="verified" /> <span className={!ownerVerified ? "ml-2 text-[13px]" : "ml-2 text-[13px]"} aria-label='verification'>{ownerVerified ? "Verified" : "Beginner"}</span>
            </div>}
            {<div className="border border-[#EAEAEA] px-3 py-1 bg-[#FFFFFF] rounded-[11px] flex items-center" onClick={openTime} aria-label='time'>
              <Image src={Instant} alt="instant" /> <span className="ml-2 text-[13px]" aria-label='time'>{btnText}</span>
            </div>}
            <div className="border border-[#EAEAEA] px-3 py-1 bg-[#FFFFFF] rounded-[11px] flex items-center" onClick={openHistory} aria-label='history'>
              <Image src={History} alt="history" /> <span className="ml-2 text-[13px]" aria-label='history'>History</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6 border-b border-b-[#DDDDDD] pb-2 mx-4">
          <div className="flex items-center">
            <Image src={sell_currency_details?.artwork} alt="sell" width={16} height={16} /> <span className="ml-1 text-[13px]">Buy {sell_currency_details?.type === "FIAT" ? `${sell_currency_details?.currency} (${sell_currency_details?.network})` : `${sell_currency_details?.name} (${sell_currency_details?.network})`}</span>
          </div>
          <div className="flex items-center">
            <Image src={buy_currency_details?.artwork} alt="buy" width={16} height={16} /> <span className="ml-1 text-[#2F80ED] text-[13px]">Pay with {buy_currency_details?.type === "FIAT" ? `${buy_currency_details?.currency} (${buy_currency_details?.network})` : `${buy_currency_details?.currency} (${buy_currency_details?.network})`}</span>
          </div>
        </div>
        <div className="flex justify-between mt-3 px-4">
          <div className="flex items-center">
            <span className="ml-1 text-[13px]">Available</span>
          </div>
          <div className="flex items-center">
            <span className="ml-1 text-[#2F80ED] text-[13px] font-[400]">{trade?.buy_amount_left ? formatCryptoNumber(trade?.buy_amount_left) : ""} {sell_currency_details?.currency} = {trade?.buy_amount_left_for_buy_currency && formatCryptoNumber(trade?.buy_amount_left_for_buy_currency)} {buy_currency_details?.currency}</span>
          </div>
        </div>
        <div className="flex justify-between mt-3 px-4">
          <div className="flex items-center">
            <span className="ml-1 text-[13px]">Minimum</span>
          </div>
          <div className="flex items-center">
            <span className="ml-1 text-[#2F80ED] text-[13px] font-[400]">{trade?.min_buy ? formatCryptoNumber(trade?.min_buy) : ""} {sell_currency_details?.currency} = {trade?.min_buy_for_buy_currency && formatCryptoNumber(trade?.min_buy_for_buy_currency)} {buy_currency_details?.currency}</span>
          </div>
        </div>
        <div className="flex justify-between mt-3 px-4">
          <div className="flex items-center">
            <span className="ml-1 text-[13px]">Rate</span>
          </div>
          <div className="flex items-center">
            <span className="ml-1 text-[#2F80ED] text-[13px] font-[400]">{trade?.buy_rate > 0 ? formatCryptoNumber(trade?.buy_rate) : '1'} {sell_currency_details?.currency} =  {trade?.sell_rate > 0 ? formatCryptoNumber(trade?.sell_rate) : '1'} {buy_currency_details?.currency}</span>
          </div>
        </div>
        {method_details && <div className="flex justify-between mt-3 px-4">
          <div className="flex items-center">
            <span className="ml-1 text-[13px]">{method_details?.currency_details?.currency} Payment</span>
          </div>
          <div className="flex items-center">
            <span className="ml-1 text-[#2F80ED] text-[13px] font-[400]">{method_details?.name}</span>
          </div>
        </div>}
      </div>
    </>
  )
}

export default P2PItem;