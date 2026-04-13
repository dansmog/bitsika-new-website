"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import Error from "../../../../../public/images/error.png";
import { Header } from "../../../../../components/legacy/Header";
import { Footer } from "../../../../../components/legacy/Footer";
import P2PItem from "../../../../../components/legacy/P2pItem";
import { useRouter } from "../../../../../components/legacy/router-shim";

export default function TradeDetailView({ trade }) {
  const { push } = useRouter();

  return (
    <div className="page-style">
      <Header hideLogout={!trade?.id} />
      <main className="mx-auto max-w-md  bg-white py-4 px-6 sm:px-6 relative">
        {trade?.id && (
          <div className="my-3 text-center font-[400] text-[15px] max-w-[330px] mx-auto">
            {trade?.status === "Active" ? (
              <p>
                This Trade Ad can only be purchased inside the Bitsika app.
                Download the app above or click “Open In App” if you’re already
                a user.
              </p>
            ) : (
              <p>
                This{" "}
                <span className="text-[#FC4949] font-medium">
                  Trade Ad has been closed
                </span>{" "}
                by the seller. You cannot make purchases from it. You can
                however explore{" "}
                <Link href={`/user/${trade?.owner?.username}/trade`}>
                  more offers from this seller
                </Link>{" "}
                here.
              </p>
            )}
          </div>
        )}
        {trade?.id ? (
          <div className="mt-8 mb-24 relative w-full">
            <P2PItem trade={trade} />
          </div>
        ) : (
          <div className="py-14 flex flex-col justify-center items-center">
            <span className="items-center flex justify-center">
              <Image
                src={Error}
                alt="error"
                width={175}
                height={175}
                className="rounded-lg object-cover"
              />
            </span>
            <p className="text-gray-400 px-2 items-center h-fit text-center ">
              The page you are looking for has moved or doesn’t exist anymore.
            </p>
            <div
              className={classNames(
                "w-fit bg-[#2F80ED1A] py-[5px] px-3 rounded-[22px] text-center mt-5"
              )}
              onClick={() => push("/")}
            >
              <p className="text-[12px] cursor-pointer text-[#2F80ED] font-[500]">
                Go back to Home
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
