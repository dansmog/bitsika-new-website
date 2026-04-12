"use client";

import Image from "next/image";
import { AnimatePresence, cubicBezier, motion } from "motion/react";
import { useState } from "react";
import Container from "../layout/Container";
import type { TestimonialsContent } from "@/content/shape";
import type { RemoteImage } from "@/content/imageShape";

const ease = cubicBezier(0.4, 0, 0.2, 1);

type TestimonialsProps = {
  testimonials: TestimonialsContent;
  testimonialImages: RemoteImage[];
};

export default function Testimonials({
  testimonials,
  testimonialImages,
}: TestimonialsProps) {
  const items = testimonials.items;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (next: number) => {
    if (next === current) return;
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go(current === 0 ? items.length - 1 : current - 1);
  const next = () => go(current === items.length - 1 ? 0 : current + 1);

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

  const t = items[current];
  const avatar = testimonialImages[current];

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="max-w-217 mx-auto">
          <p className="text-[#1A73E8] font-google-sans text-sm md:text-xl font-medium mb-6">
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
                &ldquo;{t.text}&rdquo;
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
                <div
                  className="bg-[#E8E8E8] shrink-0 relative overflow-hidden"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10.38,
                    border: "1.3px solid #ECECEC",
                  }}
                >
                  {avatar?.src && (
                    <Image
                      src={avatar.src}
                      alt={avatar.alt || t.user}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-google-sans font-medium text-sm text-ink leading-tight">
                    {t.user}
                  </p>
                  <p className="font-google-sans text-sm text-[#6B6B6B] leading-tight mt-0.5">
                    {t.location}
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

              <div className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-full bg-[#F5F5F5]">
                {items.map((_, i) => (
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
