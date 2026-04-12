"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/layout/Container";
import type { FaqContent } from "@/content/shape";

type FAQProps = {
  faq: FaqContent;
};

export default function FAQ({ faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = faq.items;

  return (
    <section className="bg-[#F5F5F5] py-8 md:py-20">
      <Container>
        <div className="flex gap-5 max-lg:flex-col md:gap-40">
          <div className="w-86.5 shrink-0 max-lg:w-full">
            <h2 className="font-google-sans font-normal text-2xl md:text-[40px] white leading-[114%] tracking-[-0.4px] text-[#1A1A1A]">
              {faq.heading}
            </h2>
          </div>

          <div className="flex-1 flex flex-col">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const nextIsOpen = openIndex === index + 1;

              return (
                <motion.div
                  key={index}
                  layout
                  animate={isOpen ? { borderRadius: 16 } : { borderRadius: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`overflow-hidden transition-colors duration-200 px-1 md:px-2 ${
                    isOpen
                      ? "bg-[#FBFAF9] border border-[#ECECEC] py-1 md:py-2"
                      : `${!nextIsOpen ? "border-b border-[#E0E0E0]" : ""}`
                  }`}
                >
                  {/* Question row — white bg with border when open */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`w-full flex items-center gap-4 text-left cursor-pointer transition-colors duration-200 ${
                      isOpen
                        ? "bg-white border border-[#ECECEC] rounded-2xl p-3"
                        : "py-4 px-4"
                    }`}
                  >
                    {/* Number badge */}
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isOpen
                          ? "bg-[#1A1A1A] text-white"
                          : "bg-[#EBEBEB] text-[#A6A6A6]"
                      }`}
                      style={{
                        fontFamily:
                          "var(--font-google-sans, 'Google Sans', sans-serif)",
                        fontWeight: 500,
                        fontSize: "13.71px",
                        lineHeight: "120%",
                        letterSpacing: "0%",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </span>

                    {/* Question */}
                    <span
                      className={`flex-1 font-google-sans font-normal text-lg leading-[130%] transition-colors duration-200 ${
                        isOpen ? "text-[#1A1A1A]" : "text-[#7E7E7E]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Toggle icon */}
                    <span className="shrink-0">
                      {isOpen ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 7.99967C2 7.63148 2.29848 7.33301 2.66667 7.33301H13.3333C13.7015 7.33301 14 7.63148 14 7.99967C14 8.36786 13.7015 8.66634 13.3333 8.66634H2.66667C2.29848 8.66634 2 8.36786 2 7.99967Z"
                            fill="black"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 2C8.36819 2 8.66667 2.29848 8.66667 2.66667V7.33333H13.3333C13.7015 7.33333 14 7.63181 14 8C14 8.36819 13.7015 8.66667 13.3333 8.66667H8.66667V13.3333C8.66667 13.7015 8.36819 14 8 14C7.63181 14 7.33333 13.7015 7.33333 13.3333V8.66667H2.66667C2.29848 8.66667 2 8.36819 2 8C2 7.63181 2.29848 7.33333 2.66667 7.33333H7.33333V2.66667C7.33333 2.29848 7.63181 2 8 2Z"
                            fill="#7E7E7E"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pl-16 pr-4 py-5 font-normal text-sm leading-[160%] text-ink-secondary">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
