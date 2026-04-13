"use client";

import { AnimatePresence, cubicBezier, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "../layout/Container";
import type { StepsContent } from "@/content/shape";
import type { RemoteImage } from "@/content/imageShape";

type GetStartedProps = {
  steps: StepsContent;
  image: RemoteImage;
};

const activeTitleClass =
  "font-google-sans font-medium text-base md:text-[20px] leading-[120%] tracking-[0]";
const inactiveTitleClass =
  "font-google-sans font-normal text-base md:text-[20px] leading-[120%] tracking-[0]";

const cardVariants = {
  down: {
    hidden: { height: 0, opacity: 0, y: -8 },
    visible: { height: "auto", opacity: 1, y: 0 },
  },
  up: {
    hidden: { height: 0, opacity: 0, y: 8 },
    visible: { height: "auto", opacity: 1, y: 0 },
  },
};

const transition = { duration: 0.35, ease: cubicBezier(0.4, 0, 0.2, 1) };

const imageSizes = [
  { width: 342.857, height: 218.75 },
  { width: 380.857, height: 242.995 },
  { width: 416.857, height: 265.964 },
];

const mobileImageSizes = [
  { width: 174, height: 111.016 },
  { width: 204, height: 130.16 },
  { width: 232, height: 148.02 },
];

export default function GetStarted({
  steps: stepsContent,
  image,
}: GetStartedProps) {
  const items = stepsContent.steps;
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleStepClick = (index: number) => {
    if (index === activeStep) return;
    setActiveStep(index);
  };

  return (
    <section className="bg-white py-14.25 md:py-20">
      <Container>
        <div className="flex gap-12 items-start flex-col">
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-google-sans font-normal text-[32px] md:text-[40px] leading-[114%] tracking-[-0.01em] max-w-115">
              {stepsContent.heading}
            </h2>
            <p className="font-normal text-base leading-[130%] tracking-[-0.01em] text-ink-secondary max-w-180">
              {stepsContent.description}
            </p>
          </div>
          <div className="w-full flex flex-col lg:flex-row xl:flex-row">
            {/* Left: title + steps */}
            <div className="flex-1 max-w-140 order-2 lg:order-1">
              <div className="flex flex-col">
                {items.map((step, index) => {
                  const isActive = activeStep === index;
                  const isLast = index === items.length - 1;
                  const opensDownward = index === 0;
                  const dir = opensDownward ? "down" : "up";

                  return (
                    <div key={index} className="flex">
                      {/* Number badge + connector line */}
                      <div className="flex flex-col items-center">
                        <motion.button
                          onClick={() => handleStepClick(index)}
                          aria-pressed={isActive}
                          animate={{
                            backgroundColor: isActive ? "#0A0A0A" : "#ffffff",
                            color: isActive ? "#ffffff" : "#ADADAD",
                            borderColor: isActive ? "#0A0A0A" : "#D0D0D0",
                          }}
                          transition={{ duration: 0.2 }}
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-base font-medium shrink-0 mt-3 cursor-pointer"
                        >
                          {index + 1}
                        </motion.button>

                        {!isLast && (
                          <div className="w-px flex-1 min-h-4 bg-border-default" />
                        )}
                      </div>

                      {/* Content — 19px from badge */}
                      <div
                        className="flex-1 pb-3.75"
                        style={{ paddingLeft: 19 }}
                      >
                        {/* Card above (steps 2 & 3 open upward) */}
                        {!opensDownward && (
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                key="card-up"
                                variants={cardVariants[dir]}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={transition}
                                style={{ overflow: "hidden" }}
                              >
                                <div className="pt-3">
                                  <div className="bg-[#F5F5F5] rounded-2xl px-5 py-4 flex flex-col gap-2">
                                    <h3
                                      className={`${activeTitleClass} text-ink`}
                                    >
                                      {step.title}
                                    </h3>
                                    <p className="text-ink-secondary text-sm leading-[140%] tracking-[-0.01em]">
                                      {step.text}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}

                        {/* Collapsed title (exits when active) */}
                        <AnimatePresence initial={false}>
                          {!isActive && (
                            <motion.div
                              key="collapsed-title"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={transition}
                              style={{ overflow: "hidden" }}
                            >
                              <button
                                onClick={() => handleStepClick(index)}
                                className="py-3 w-full text-left cursor-pointer"
                              >
                                <span
                                  className={`${inactiveTitleClass} text-ink-placeholder`}
                                >
                                  {step.title}
                                </span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Card below (step 1 opens downward) */}
                        {opensDownward && (
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                key="card-down"
                                variants={cardVariants[dir]}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={transition}
                                style={{ overflow: "hidden" }}
                              >
                                <div className="pb-3">
                                  <div className="bg-[#F5F5F5] rounded-2xl px-5 py-4 flex flex-col gap-2">
                                    <h3
                                      className={`${activeTitleClass} text-ink`}
                                    >
                                      {step.title}
                                    </h3>
                                    <p className="text-ink-secondary text-sm leading-[140%] tracking-[-0.01em]">
                                      {step.text}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: phone mockup with game image */}
            <div className="flex-1 flex items-center justify-center max-lg:w-full order-1 lg:order-2 mb-10 lg:mb-0 xl:mb:0">
              <div className="bg-[#F6F6F6] rounded-3xl w-161 overflow-hidden h-66 md:h-112.25 flex items-start justify-center pt-10 md:pt-14.25">
                <div className="relative">
                  {/* Phone frame */}
                  <div className="bg-black rounded-3xl w-[193.634px] md:w-82 h-auto md:h-178.25 aspect-328/713 overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-3 pb-2">
                      <span className="text-white text-xs font-semibold">
                        16:06
                      </span>
                      <div className="flex items-center gap-1">
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0"
                            y="6"
                            width="3"
                            height="6"
                            rx="0.5"
                            fill="white"
                          />
                          <rect
                            x="4"
                            y="4"
                            width="3"
                            height="8"
                            rx="0.5"
                            fill="white"
                          />
                          <rect
                            x="8"
                            y="2"
                            width="3"
                            height="10"
                            rx="0.5"
                            fill="white"
                          />
                          <rect
                            x="12"
                            y="0"
                            width="3"
                            height="12"
                            rx="0.5"
                            fill="white"
                            opacity="0.3"
                          />
                        </svg>
                        <span className="text-white text-[10px]">LTE</span>
                        <span className="text-white text-[10px] bg-[#3A3A3A] rounded px-1 font-semibold">
                          72
                        </span>
                      </div>
                    </div>
                    {/* Action icons */}
                    <div className="flex items-center justify-end gap-3 px-5 pb-4">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3.75V14.25M3.75 9H14.25"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="5.25"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M12 12L15.75 15.75"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="5" cy="9" r="1.25" fill="white" />
                        <circle cx="9" cy="9" r="1.25" fill="white" />
                        <circle cx="13" cy="9" r="1.25" fill="white" />
                      </svg>
                    </div>
                    {/* Spacer for phone body */}
                    <div className="h-28" />
                  </div>

                  {/* Game image overlapping the phone */}
                  <motion.div
                    animate={{
                      width: isMobile ? mobileImageSizes[activeStep].width : imageSizes[activeStep].width,
                      height: isMobile ? mobileImageSizes[activeStep].height : imageSizes[activeStep].height,
                    }}
                    transition={transition}
                    className="absolute left-1/2 -translate-x-1/2 top-18 md:top-22.5 rounded-2xl overflow-hidden shadow-lg"
                  >
                    {image.src && (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 232px, 417px"
                        className="object-cover"
                        priority
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
