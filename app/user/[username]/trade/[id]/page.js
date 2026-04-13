import axios from "axios";
import { cache } from "react";
import TradeDetailView from "./TradeDetailView";
import { formatCryptoNumber } from "../../../../../utils";

const getTrade = cache(async (id) => {
  const BASE_URL = process.env.NEXT_PUBLIC_TRADE_BASE_URL;
  try {
    const response = await axios.get(`${BASE_URL}/public/trades/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-service-name": "transaction-api",
      },
    });
    return { trade: response.data, err: null };
  } catch (error) {
    return { trade: {}, err: error?.response?.data ?? null };
  }
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { trade } = await getTrade(id);

  const buy_currency_details = trade?.buy_currency_details;
  const sell_currency_details = trade?.sell_currency_details;
  const method_details = trade?.method_details;

  const isSellFiat = sell_currency_details?.type === "FIAT";
  const isBuyFiat = buy_currency_details?.type === "FIAT";

  const availableAmt = trade?.buy_amount_left
    ? formatCryptoNumber(trade?.buy_amount_left)
    : "";
  const payWith = `pay with ${buy_currency_details?.name} (${buy_currency_details?.network})`;
  const userInfo = ` — ${trade?.owner?.name} ($${trade?.owner?.username}) on Bitsika `;

  const getTitle = () => {
    if (isBuyFiat) {
      return `${sell_currency_details?.currency} (${
        sell_currency_details?.network
      }) ${availableAmt} available, pay with ${
        buy_currency_details?.currency
      } (${buy_currency_details?.network}) ${
        method_details ? `(${method_details?.name})` : ""
      }${userInfo}`;
    }
    if (isSellFiat) {
      return `${sell_currency_details?.currency} (${sell_currency_details?.network}) (${method_details?.name}) ${availableAmt} available, ${payWith}${userInfo}`;
    }
    return `${sell_currency_details?.currency} (${sell_currency_details?.network}) ${availableAmt} available, ${payWith}${userInfo}`;
  };

  const title = trade?.id ? getTitle() : "Page content no longer available";
  const description = trade?.id
    ? "Buy from this Trade Ad instantly on Bitsika."
    : "The page you are looking for has moved or doesn’t exist anymore.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      site: "@atsudavoh",
      creator: "@atsudavoh",
      title,
      description,
    },
  };
}

export default async function TradeDetailPage({ params }) {
  const { id } = await params;
  const { trade } = await getTrade(id);

  return <TradeDetailView trade={trade} />;
}
