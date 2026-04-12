import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BuiltDifferent from "@/components/sections/BuiltDifferent";
import FAQ from "@/components/sections/FAQ";
import InsideBitsika from "@/components/sections/InsideBitsika";
import Comparison from "@/components/sections/Comparison";
import CtaBanner from "@/components/sections/CtaBanner";
import GamesGrid from "@/components/sections/GamesGrid";
import GetStarted from "@/components/sections/GetStarted";
import InfoBlock from "@/components/sections/InfoBox";
import Testimonials from "@/components/sections/Testimonials";

const gamingBlock = {
  cards: [
    {
      title: "Crypto-Powered Game Top-Ups",
      description: `Use your crypto balance (USDT, BTC, etc.) to purchase in-game currency directly. No need to sell crypto for fiat money first. It's a seamless bridge between your digital assets and your digital entertainment.`,
      checklistItems: [
        "Deposit BTC or USDT into your Bitsika balance.",
        "Create or Top Up your virtual cards.",
        "Use from any country, with no restrictions.",
      ],
    },
    {
      title: "Save on Big purchases",
      description:
        "By buying outside of Apple and Google's app stores, you avoid their 30% commission. This saving is passed directly to you, making every gem, coin, and battle pass cheaper than buying in-game.",
      checklistItems: [
        "No KYC Documents.",
        "No phone number.",
        "No ID verification required.",
      ],
    },
    {
      title: "Get Verified and Play in Under an Hour (KYC)",
      description:
        "Our KYC process is fast and streamlined. In most cases, you'll be fully approved and ready to top up within 60 minutes. We make compliance quick so you can get back to gaming.",
      checklistItems: [
        "Generate your virtual card on the Bitsika platform.",
        "Add the card to your preferred wallet on Apple Pay, Google Pay, or PayPal.",
        "Once approved, your card will be ready for secure payments through the wallet.",
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <Header />
      <GamesGrid />
      <InfoBlock cards={gamingBlock.cards} />
      <CtaBanner />
      <Comparison />
      <InfoBlock cards={gamingBlock.cards} />
      <CtaBanner />
      <GetStarted />
      <InfoBlock cards={gamingBlock.cards} />
      <CtaBanner />
      <Testimonials />
      <InfoBlock cards={gamingBlock.cards} />
      <CtaBanner />
      <BuiltDifferent />
      <InsideBitsika />
      <FAQ />
      <Footer />
    </main>
  );
}
