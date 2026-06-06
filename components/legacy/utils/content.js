import BankCard from "../public/images/bank-card.png";
import CreditCard from "../public/images/credit.png";
import Clock from "../public/images/clock.png";
import Globe from "../public/images/globe.png";
import Wallet from "../public/images/wallet.png";

import Store from "../public/images/store.png";
import Tether from "../public/images/tether.png";
import Lock from "../public/images/lock.png";
import GiftCard from "../public/images/gift-card.png";
import Passport from "../public/images/passport.png";

import Profile from "../public/images/profile.png";
import Bank from "../public/images/bank.png";
import Money from "../public/images/money.png";

export const getVirtualCardContent = (t, locale = "en") => {
  const kycLink = locale !== "en" ? `/${locale}-lang/kyc-aml` : "/kyc-aml";
  return [
  {
    number: 1,
    title: t("block_1_title"),
    body: `<p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
      ${t("block_1_paragraph")}</p>`,
    reverse: false,
    image: Tether,
    alt: t("icon_tether"),
    link: "#",
  },
  {
    number: 2,
    title: t("block_2_title"),
    body: `
      <p className="mt-4 font-regular text-lg md:text-2xl  text-white tracking-tighter">
      ${t("block_2_paragraph").replace(/\*\*(.+?)\*\*/, `<a href="${kycLink}" style="text-decoration: underline; color: white;">$1</a>`)}
      </p> `,
    reverse: true,
    image: Passport,
    alt: t("icon_passport"),
  },
  {
    number: 3,
    title: t("block_3_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
     ${t("block_3_paragraph")}
     </p>
    `,
    reverse: false,
    image: Wallet,
    alt: t("icon_wallet"),
  },
];
};

export const getVirtualCardContent1 = (t) => [
  {
    number: 4,
    title: t("block_4_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
     ${t("block_4_paragraph")}</p>
    `,
    reverse: true,
    alt: t("icon_profile"),
    image: Profile,
  },
  {
    number: 5,
    title: t("block_5_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">${t(
        "block_5_paragraph"
      )}</p>
    `,
    reverse: false,
    alt: t("icon_credit"),
    image: CreditCard,
  },
];

export const getVirtualCardContent2 = (t) => [
  {
    number: 6,
    title: t("block_6_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
      ${t("block_6_paragraph")}
     </p>
    `,
    alt: t("icon_bank_card"),
    reverse: true,
    image: BankCard,
  },
  {
    number: 7,
    title: t("block_7_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
      ${t("block_7_paragraph")}
      </p>
    `,
    image: Clock,
    alt: t("icon_clock"),
    reverse: false,
  },
  {
    number: 8,
    title: t("block_8_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
      ${t("block_8_paragraph")}
      </p>
    `,
    alt: t("icon_gift_card"),
    reverse: true,
    image: GiftCard,
  },
  {
    number: 9,
    title: t("block_9_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
     ${t("block_9_paragraph")}
      </p>
    `,
    alt: t("icon_money"),
    reverse: false,
    image: Money,
  },
  {
    number: 10,
    title: t("block_10_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
     ${t("block_10_paragraph")}
      </p>
    `,
    alt: t("icon_globe"),
    reverse: true,
    image: Globe,
  },
];

export const getVirtualCardContent3 = (t) => [
  {
    number: 11,
    title: t("block_11_title"),

    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
    ${t("block_11_paragraph")}
     </p>
    `,

    alt: t("icon_lock"),
    reverse: false,
    image: Lock,
  },
  {
    number: 12,
    title: t("block_12_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">

      ${t("block_12_paragraph")}
       </p>
    `,
    alt: t("icon_bank"),
    reverse: true,
    image: Bank,
  },

  {
    number: 13,
    title: t("block_13_title"),
    body: `
      <p className="font-regular text-lg md:text-2xl  text-white tracking-tighter">
   ${t("block_13_paragraph")}
      </p>
    `,
    alt: t("icon_store"),
    reverse: false,
    image: Store,
  },
];

export const getFaqData = (t) => {
  const faqItems = [
    {
      question: t("faq_q1"),
      answer: t("faq_a1"),
    },
    {
      question: t("faq_q2"),
      answer: t("faq_a2"),
    },
    {
      question: t("faq_q3"),
      answer: t("faq_a3"),
    },
    {
      question: t("faq_q4"),
      answer: t("faq_a4"),
    },
    {
      question: t("faq_q5"),
      answer: t("faq_a5"),
    },
    {
      question: t("faq_q6"),
      answer: t("faq_a6"),
    },
    {
      question: t("faq_q7"),
      answer: t("faq_a7"),
    },
    {
      question: t("faq_q8"),
      answer: t("faq_a8"),
    },
    {
      question: t("faq_q9"),
      answer: t("faq_a9"),
    },
    {
      question: t("faq_q10"),
      answer: t("faq_a10"),
    },
    {
      question: t("faq_q11"),
      answer: t("faq_a11"),
    },
    {
      question: t("faq_q12"),
      answer: t("faq_a12"),
    },
    {
      question: t("faq_q13"),
      answer: t("faq_a13"),
    },
    {
      question: t("faq_q14"),
      answer: t("faq_a14"),
    },
    {
      question: t("faq_q15"),
      answer: t("faq_a15"),
    },
    {
      question: t("faq_q16"),
      answer: t("faq_a16"),
    },
    {
      question: t("faq_q17"),
      answer: t("faq_a17"),
    },
  ];

  // Filter out FAQ items where question or answer is undefined or just returns the key name
  return faqItems.filter(
    (item) =>
      item.question &&
      item.answer &&
      !item.question.startsWith("faq_q") &&
      !item.answer.startsWith("faq_a")
  );
};

export const productLinks = [
  {
    id: 1,
    title: "Virtual Cards",
    href: "/",
  },
  {
    id: 2,
    title: "Gift Cards",
    href: "#gift-cards",
  },
  {
    id: 3,
    title: "Roblox Gift Cards",
    href: "#roblox-gift-cards",
  },
  {
    id: 4,
    title: "Razer Gold Gift Cards",
    href: "#razer-gold-gift-cards",
  },
  {
    id: 5,
    title: "Direct Game Top-Up",
    href: "#direct-game-top-up",
  },
  {
    id: 6,
    title: "Call of Duty Mobile (CODM) Top-Up",
    href: "#codm-top-up",
  },
  {
    id: 7,
    title: "PUBG Top-Up",
    href: "#pubg-top-up",
  },
  {
    id: 8,
    title: "Free Fire Diamonds Top-Up",
    href: "#free-fire-diamonds-top-up",
  },
];
