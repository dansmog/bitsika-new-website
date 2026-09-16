import BettingIcon from "../public/icons/betting-icon.svg";
import CardIcon from "../public/icons/visa-card-icon.svg";
import CurrencyConverterIcon from "../public/icons/currency-converter-icon.svg";
import P2PIcon from "../public/icons/p2p-trade-icon.svg";
import EarnIcon from "../public/images/earn-icon.png";

import Nigeria from "../public/images/nigeria.png";
import Ghana from "../public/images/ghana.png";
import UnitedStates from "../public/images/unitedstate.png";

export const truncateString = (str, n) => {
  if (str) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }
};

export const formatNumber = (value = 0, locale) => {
  if (["en", "en-US", "en-GB"].includes(locale)) {
    return value % 1 === 0
      ? Number(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Number(value)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (["fr", "fr-FR"].includes(locale)) {
    return value % 1 === 0
      ? Number(value).toLocaleString("fr")
      : Number(value).toLocaleString("fr", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  }
  return Number(value)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumberWithoutDecimal = (value = 0, locale) => {
  if (["en", "en-US", "en-GB"].includes(locale)) {
    return value % 1 === 0
      ? Number(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Number(value)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (["fr", "fr-FR"].includes(locale)) {
    return value % 1 === 0
      ? Number(value).toLocaleString("fr")
      : Number(value).toLocaleString("fr", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  }
  return Number(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatCryptoNumber = (number = 0, dec = 2) => {
  const splitValue = number.split(".");
  let end;
  let beginning;
  const initial = splitValue[0];
  const decimal = splitValue[1];

  if (/^0*$/.test(decimal) && String(initial).length < 4) {
    return Number(number)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (!/^0*$/.test(decimal) && /^0*$/.test(initial)) {
    return number.replace(/\.?0+$/, "");
  } else if (!/^0*$/.test(decimal) && !/^0*$/.test(initial)) {
    return number.replace(/\.?0+$/, "");
  }
  return Number(number)
    .toFixed(dec)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getUniqueTrades = (currentData, addedData) => {
  let arr = [...currentData];

  if (addedData)
    for (let i = 0; i < addedData.length; i++) {
      let foundObject = arr.find((item) => item.id === addedData[i].id);
      if (!foundObject) {
        arr.push(addedData[i]);
      }
    }

  return arr;
};

export const getUniqueData = (currentData, addedData) => {
  let arr = [...currentData];

  if (addedData)
    for (let i = 0; i < addedData.length; i++) {
      let foundObject = arr.find(
        (item) => item.username === addedData[i].username
      );
      if (!foundObject) {
        arr.push(addedData[i]);
      }
    }

  return arr;
};

export const getUniquePosts = (currentData, addedData) => {
  let arr =
    currentData[0]?.owner.username === addedData[0]?.owner.username
      ? [...currentData]
      : [];

  if (addedData)
    for (let i = 0; i < addedData.length; i++) {
      let foundObject = arr.find((item) => item.id === addedData[i].id);
      if (!foundObject) {
        arr.push(addedData[i]);
      }
    }

  return arr;
};

export const getUniqueComments = (currentData, addedData) => {
  let arr = [...currentData];

  if (addedData)
    for (let i = 0; i < addedData.length; i++) {
      let foundObject = arr.find((item) => item.id === addedData[i].id);
      if (!foundObject) {
        arr.push(addedData[i]);
      }
    }

  return arr;
};

export const getUniqueReplies = (currentData, addedData) => {
  let arr = [...currentData];
  if (addedData)
    for (let i = 0; i < addedData.length; i++) {
      let foundObject = arr.find(
        (item) => item.comment.id === addedData[i].comment.id
      );
      if (!foundObject) {
        arr.push(addedData[i]);
      }
    }

  return arr;
};

export const getUniqueFundings = (currentData, addedData) => {
  let arr = [...currentData];

  if (addedData)
    for (let i = 0; i < addedData.length; i++) {
      let foundObject = arr.find((item) => item.id === addedData[i].id);
      if (!foundObject) {
        arr.push(addedData[i]);
      }
    }

  return arr;
};

export const getCurrency = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "$";
  }
};

export const getFirstSentence = (value = "") => {
  const hashResult = value?.match(/^.*?[\.,:;!\n\?](?:\s|$)/);

  if (hashResult && hashResult[0]) {
    return `${truncateString(
      hashResult[0].replaceAll(/[\n]/gi, ""),
      120
    )}`.trim();
  }
  return `${truncateString(value, 120)}`.trim();
};

export const removeFirstSentence = (value = "") => {
  const sentence = value?.replace(/^.*?[\.,:;!\n\?](?:\s|$)/, "");
  return truncateString(sentence, 280);
};

export const createUsername = (name) => {
  const randomNo = Math.floor(Math.random() * 343345);
  const userName = name.toLowerCase() + randomNo;
  const substring_name = userName.substr(0, 14);

  return substring_name;
};

export const validateFields = (data, required, noScroll) => {
  let errors = {};

  for (var i = 0, len = required.length; i < len; i++) {
    let value = data[required[i]];

    if (typeof value === "number") {
      value = `${value}`;
    }

    if (!data.hasOwnProperty(required[i])) {
      continue;
    }
    if (value.trim().length < 3 && required[i] === "username") {
      errors[required[i]] = `This field is required (3 or more characters)`;
    } else if (value.trim().length < 2 && required[i] === "name") {
      errors[required[i]] = `This field is required (2 or more characters)`;
    } else {
      errors[required[i]] = "";
    }
    // if (value.trim() === "" || value.length === 0) {
    //   noScroll && window.scrollTo(0, 0);
    //   if (required[i] === 'username') {
    //   } else if (required[i] === 'displayName') {
    //   }
    // }
    // continue;
  }
  return errors;
};

export const serializeErrors = (error) => {
  let errorObject = {};

  if (error && typeof error === "object") {
    Object.keys(error).forEach((err) => {
      errorObject[err] = error[err][0];
    });
  }
  return errorObject;
};

export const navigation = [
  {
    id: 2,
    title: "USDT Virtual Prepaid Visa Cards",
    url: "/prepaid-virtual-visa-card",
    description:
      "Create virtual prepaid Visa debit cards to shop online anywhere.",
    img: CardIcon,
    alt: "Virtual Visa Cards icon",
  },
  {
    id: 3,
    title: "Currency Converter",
    url: "/currency-converter",
    description:
      "Check exchange rates for any pair of the world’s leading currencies.",
    img: CurrencyConverterIcon,
    alt: "Currency Converter icon",
  },
  // {
  //   id: 4,
  //   title: "Earn $10 USDT Daily",
  //   url: "/get-paid-to-chat",
  //   description: "Earn money by chatting with friends on our app.",
  //   img: EarnIcon,
  //   alt: "Earn icon",
  // },
  {
    id: 1,
    title: "USDT Betting",
    url: "/betting-event",
    description:
      "Bet against others on sports games, pop culture events and more. No odds involved — winners take all.",
    img: BettingIcon,
    alt: "Betting icon",
  },

  {
    id: 5,
    title: "USDT P2P Trading",
    url: "/",
    description:
      "Exchange your local currency for stablecoins like USDT, all with zero fees.",
    img: P2PIcon,
    alt: "P2P Trading icon",
  },
];

export const internalNavigation = [
  {
    id: 5,
    title: "USDT P2P Trading",
    url: "/",
    description:
      "Exchange your local currency for stablecoins like USDT, all with zero fees.",
    img: P2PIcon,
    alt: "P2P Trading icon",
  },
  // {
  //   id: 2,
  //   title: "USDT Virtual Visa Cards",
  //   url: "/prepaid-virtual-visa-card",
  //   description:
  //     "Create virtual prepaid Visa debit cards to shop online anywhere.",
  //   img: CardIcon,
  //   alt: "Virtual Visa Cards icon",
  // },
  {
    id: 1,
    title: "USDT Betting",
    url: "/betting-event",
    description:
      "Bet on sports and real-world events with ease. No odds involved — winners take all.",
    img: BettingIcon,
    alt: "Betting icon",
  },

  {
    id: 3,
    title: "Currency Converter",
    url: "/currency-converter",
    description:
      "Check exchange rates for any pair of the world’s leading currencies.",
    img: CurrencyConverterIcon,
    alt: "Currency Converter icon",
  },
  // {
  //   id: 4,
  //   title: "Earn $10 USDT Daily",
  //   url: "/get-paid-to-chat",
  //   description: "Earn money by chatting with friends on our app.",
  //   img: EarnIcon,
  //   alt: "Earn icon",
  // },
];

export const currencyPairs = [
  {
    country: "Ghana",
    img: Ghana,
    currency: "Ghanaian Cedis (GHS)",
    description:
      "Explore all GHS related exchange rate pairings that Bitsika tracks.",
    base: "ghs",
    pairs: ["usd", "gbp", "aed", "yen", "xof", "xaf", "cny", "zar", "kes"],
  },
  {
    country: "United states",
    img: UnitedStates,
    currency: "United States Dollar (USD)",
    description:
      "Explore all USD related exchange rate pairings that Bitsika tracks.",
    base: "usd",
    pairs: ["ghs", "gbp", "aed", "yen", "xof", "xaf", "cny", "zar", "kes"],
  },
  {
    country: "Nigeria",
    img: Nigeria,
    currency: "Nigerian Naira (NGN)",
    description:
      "Explore all NGN related exchange rate pairings that Bitsika tracks.",
    base: "ngn",
    pairs: ["usd", "gbp", "aed", "yen", "xof", "xaf", "cny", "zar", "kes"],
  },
];

export const pairingsFaq = [
  {
    question: "How do {base} and {quote} compare to each other?",
    answer:
      "{base} and {quote} serve different roles in the financial ecosystem, but both can be used for transactions and exchanges. The {base} to {quote} conversion rate is influenced by various factors, including market conditions and demand. {base} and {quote} are both used widely across various markets, with both offering dynamic utility depending on the transaction or platform, making it important to check rates before making a transaction.",
  },
  {
    question: "How frequently does the {base} to {quote} exchange rate change?",
    answer:
      "The {base} to {quote} exchange rate can fluctuate based on market conditions, demand, and external economic factors. While some periods see stability, small changes may still occur due to liquidity and trading volume.",
  },
  {
    question: "Where can I check the latest {base} to {quote} exchange rate?",
    answer:
      "You can find the latest {base} to {quote} exchange rate on financial service platforms, exchange providers, and market tracking tools. Comparing multiple sources can help ensure you get the best rate.",
  },

  {
    question: "Are there any fees when converting {base} to {quote}?",
    answer:
      "The cost of converting {base} to {quote} depends on the platform you use. Some services charge transaction fees, while others include conversion costs within the exchange rate. Reviewing fee structures beforehand can help you avoid unnecessary costs.",
  },
  {
    question:
      "How long does it take for my {base} to {quote} transaction to complete?",
    answer:
      "The speed of an {base} to {quote} transaction depends on the service provider and the method used. Some transactions happen instantly, while others may take longer due to processing times, verification requirements, or network delays.",
  },
  {
    question: "Is converting {base} to {quote} a safe and secure process?",
    answer:
      "Converting {base} to {quote} is safe if done through a trusted provider with strong security measures. Always verify the platform, enable security features, and follow recommended safety practices to protect your funds.",
  },
  {
    question: "Can I use {base} to {quote} for everyday transactions globally?",
    answer:
      "Whether {base} to {quote} can be used for daily transactions depends on the service providers and merchants you interact with. Some currencies are more widely accepted for payments, while others are primarily used for trading or transfers.",
  },
  {
    question: "What factors influence the {base} to {quote} exchange rate?",
    answer:
      "The {base} to {quote} exchange rate is affected by market trends, supply and demand, and broader financial conditions. Changes in policies, global economic shifts, and trading activity can also impact the rate over time.",
  },
  {
    question: "Are there limits on how much {base} to {quote} I can convert?",
    answer:
      "Some platforms impose limits on {base} to {quote} conversions based on user verification levels, transaction size, or regulatory requirements. Checking the platform’s policies can help you understand any restrictions that may apply.",
  },
  {
    question:
      "What is the best way to store my {base} to {quote} after conversion?",
    answer:
      "The best way to store {base} to {quote} depends on your needs. If you plan to use it frequently, keeping it accessible on a platform may be convenient, while long-term holders may prefer more secure storage options.",
  },
];



export const currencyNames = {
  ghs: "Ghanaian Cedis (GHS)",
  usd: "United States Dollar (USD)",
  ngn: "Nigerian Naira (NGN)",
  aed: "Emirati Dirhams (AED)",
  pkr: "Pakistani Rupees (PKR)",
  doge: "Dogecoin (DOGE)",
  eth: "Ethereum (ETH)",
  btc: "Bitcoin (BTC)",
  xrp: "XRP (XRP)",
  ltc: "Litecoin (LTC)",
  bch: "Bitcoin Cash (BCH)",
  xlm: "Stellar (XLM)",
  xmr: "Monero (XMR)",
  zec: "Zcash (ZEC)",
  bnb: "Binance Coin (BNB)",
  usdt: "Tether (USDT)",
  usdc: "USDC (USDC)",
  bnb: "Binance Coin (BNB)",
  eur: "Euro (EUR)",
  gbp: "British Pound (GBP)",
  cad: "Canadian Dollar (CAD)",
  aud: "Australian Dollar (AUD)",
  nzd: "New Zealand Dollar (NZD)",
  chf: "Swiss Franc (CHF)",
  jpy: "Japanese Yen (JPY)",
  inr: "Indian Rupee (INR)",
  brl: "Brazilian Real (BRL)",
  rub: "Russian Ruble (RUB)",
  kes: "Kenyan Shilling (KES)",
  xof: "West African CFA Franc (XOF)",
  xaf: "Central African CFA Franc (XAF) ",
  cny: "Chinese Yuan (CNY)",
  zar: "South African Rand (ZAR)",
  ugx: "Ugandan Shilling (UGX)",
  zmw: "Zambian Kwacha (ZMW)",
  zwl: "Zimbabwean Dollar (ZWL)",
  qar: "Qatari Riyal (QAR)",
  kwd: "Kuwaiti Dinar (KWD) ",
  aed: "Emirati Dirhams (AED)",
  sar: "Saudi Riyal (SAR)",
  omr: "Omani Rial (OMR)",
  inr: "Indian Rupee (INR)",
  myr: "Malaysian Ringgit (MYR)",
  hkd: "Hong Kong Dollar (HKD)",
  huf: "Hungarian Forint (HUF)",
  hrk: "Croatian Kuna (HRK)",
  isk: "Icelandic Króna (ISK)",
  inr: "Indian Rupee (INR)",
  omr: "Omani Rial (OMR)",
  pln: "Polish Zloty (PLN)",
  sek: "Swedish Krona (SEK)",
  thb: "Thai Baht (THB)",
  try: "Turkish Lira (TRY)",
  twd: "New Taiwan Dollar (TWD)",
  php: "Philippine Peso (PHP)",
  idr: "Indonesian Rupiah (IDR)",
  krw: "South Korean Won (KRW)",
  huf: "Hungarian Forint (HUF)",
};
