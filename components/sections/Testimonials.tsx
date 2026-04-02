"use client";

import { AnimatePresence, cubicBezier, motion } from "motion/react";
import { useState } from "react";
import Container from "../layout/Container";

const testimonials = [
  {
    quote:
      "I've tried a lot of virtual cards, but Bitsika actually works everywhere I need it to. I use it for international sites that don't accept my local card.",
    name: "James Edward",
    location: "Lagos, Nigeria",
    flag: "🇳🇬",
    avatar: "",
  },
  {
    quote:
      "Funding my gaming accounts used to be a nightmare. With Bitsika I just use my crypto balance and everything works in seconds. Game changer.",
    name: "Kwame Asante",
    location: "Accra, Ghana",
    flag: "🇬🇭",
    avatar: "",
  },
  {
    quote:
      "The KYC was done in under 30 minutes. I was honestly shocked. Every other platform makes you wait days. Bitsika just works.",
    name: "Amara Diallo",
    location: "Dakar, Senegal",
    flag: "🇸🇳",
    avatar: "",
  },
];

const ease = cubicBezier(0.4, 0, 0.2, 1);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (next: number) => {
    if (next === current) return;
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => go(current === testimonials.length - 1 ? 0 : current + 1);

  const variants = {
    enter: (d: number) => ({
      x: d * 40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d * -40,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="max-w-217 mx-auto">
          <p className="text-[#1A73E8] font-google-sans text-sm font-medium mb-6">
            Testimonials from our Users
          </p>
          <div className=" overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease }}
                className="font-google-sans font-normal text-xl md:text-[36px] leading-[114%] tracking-[-0.01em] text-black max-w-4xl"
              >
                &ldquo;{t.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="w-full h-px my-6 bg-border-default"></div>

          <div className="flex flex-col md:flex-row md:items-end justify-between md:gap-6 flex-wrap">
            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current + "-author"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="flex items-center gap-3"
              >
                <div className="bg-[#E8E8E8] shrink-0" style={{ width: 48, height: 48, borderRadius: 10.38, border: "1.3px solid #ECECEC" }} />
                <div>
                  <p className="font-google-sans font-medium text-sm text-ink leading-tight">
                    {t.name}
                  </p>
                  <p className="font-google-sans text-sm text-[#6B6B6B] leading-tight mt-0.5">
                    {t.location} {t.flag}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="w-full h-px my-6 bg-border-default flex md:hidden"></div>

            {/* Controls */}
            <div className="flex justify-between md:justify-items-start items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-8 h-8 rounded-full border border-[#D0D0D0] flex items-center justify-center text-ink hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="flex items-center justify-center gap-1.5"
                style={{
                  width: 86,
                  height: 32,
                  borderRadius: 50,
                  backgroundColor: "#F5F5F5",
                }}
              >
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    animate={{
                      width: i === current ? 28 : 8,
                      backgroundColor: i === current ? "#0A0A0A" : "#D0D0D0",
                    }}
                    transition={{ duration: 0.3, ease }}
                    className="h-2 rounded-full cursor-pointer"
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-8 h-8 rounded-full border border-[#D0D0D0] flex items-center justify-center text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
