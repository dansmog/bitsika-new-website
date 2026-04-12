"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/ui/DownloadButtons";

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6666 10.667C11.2866 10.667 11.5966 10.667 11.8509 10.5988C12.5411 10.4139 13.0802 9.87481 13.2651 9.18463C13.3333 8.9303 13.3333 8.62031 13.3333 8.00033V5.86699C13.3333 4.74689 13.3333 4.18683 13.1153 3.75901C12.9236 3.38269 12.6176 3.07673 12.2413 2.88498C11.8135 2.66699 11.2534 2.66699 10.1333 2.66699H7.99996C7.37998 2.66699 7.06999 2.66699 6.81565 2.73514C6.12547 2.92007 5.58638 3.45917 5.40144 4.14935C5.33329 4.40369 5.33329 4.71368 5.33329 5.33366M10.6666 8.53366V10.1337C10.6666 11.2538 10.6666 11.8138 10.4486 12.2416C10.2569 12.618 9.95093 12.9239 9.57461 13.1157C9.14678 13.3337 8.58673 13.3337 7.46663 13.3337H5.86663C4.74652 13.3337 4.18647 13.3337 3.75865 13.1157C3.38232 12.9239 3.07636 12.618 2.88461 12.2416C2.66663 11.8138 2.66663 11.2538 2.66663 10.1337V8.53366C2.66663 7.41355 2.66663 6.8535 2.88461 6.42568C3.07636 6.04935 3.38232 5.74339 3.75865 5.55165C4.18647 5.33366 4.74652 5.33366 5.86663 5.33366H7.46663C8.58673 5.33366 9.14678 5.33366 9.57461 5.55165C9.95093 5.74339 10.2569 6.04935 10.4486 6.42568C10.6666 6.8535 10.6666 7.41355 10.6666 8.53366Z"
        stroke="white"
        strokeWidth="1.41667"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L8 2M8 2H3.5M8 2V6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-70 hover:opacity-100 transition-opacity"
      title={copied ? "Copied!" : "Copy"}
    >
      <CopyIcon />
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-ink overflow-hidden rounded-t-3xl">
      <Image
        src="/images/mobile_star.svg"
        alt=""
        fill
        className="object-cover object-top pointer-events-none select-none md:hidden"
        aria-hidden
      />
      <Image
        src="/images/footer_pattern.svg"
        alt=""
        fill
        className="object-cover object-top pointer-events-none select-none hidden md:block"
        aria-hidden
      />
      <Container className="relative">
        <div className="flex items-center gap-3 pt-12 pb-10">
          <AppStoreButton />
          <GooglePlayButton />
        </div>

        <div className="border-t border-border-dark" />

        {/* Contact Us — top on mobile, right on desktop */}
        <div className="flex flex-col gap-4 py-10 md:hidden">
          <span className="text-ink-muted text-xs font-medium leading-none tracking-[-0.24px]">
            Contact Us
          </span>

          <div className="flex flex-col gap-1">
            <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
              E-mail
            </span>
            <div className="border-b border-border-dark pb-4 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]">
                  info@bitsika.com
                </span>
                <CopyButton value="info@bitsika.com" />
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col gap-1">
            <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
              Phone Number
            </span>
            <div className="border-b border-border-dark pb-4 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]">
                  +233 (0) 123-249-5839
                </span>
                <CopyButton value="+2330123-249-5839" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Links grid */}
        <div className="flex flex-wrap gap-x-16 gap-y-10 py-10 max-md:pt-0">
          {/* <div className="flex flex-col gap-3 min-w-35">
            <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
              Use cases
            </span>
            <div className="flex flex-col items-start self-stretch">
              <Link
                href="#"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Online Payments
              </Link>
              <Link
                href="#"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Gifting
              </Link>
              <Link
                href="#"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Subscriptions
              </Link>
              <Link
                href="#"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Anonymous Payments
              </Link>
            </div>
          </div> */}

          {/* Resources */}
          <div className="flex flex-col gap-3 min-w-35">
            <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
              Resources
            </span>
            <div className="flex flex-col items-start self-stretch">
              <Link
                href="https://www.bitsika.com/bitsika"
                target="_blank"
                rel="noopener noreferrer"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Blog
              </Link>
              <Link
                href="https://www.bitsika.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://www.bitsika.com/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Terms and Conditions
              </Link>
              <Link
                href="https://www.bitsika.com/kyc-aml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                KYC and AML Policy
              </Link>
              <Link
                href="https://www.bitsika.com/iran-ofac-clarification"
                target="_blank"
                rel="noopener noreferrer"
                className="flex pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Sanctions and OFAC Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-35 max-md:w-full">
            <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
              Socials
            </span>
            <div className="flex flex-col items-start self-stretch">
              <Link
                href="#"
                className="flex items-center gap-1 pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Twitter/X <ExternalLinkIcon />
              </Link>
              <Link
                href="#"
                className="flex items-center gap-1 pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                LinkedIn <ExternalLinkIcon />
              </Link>
              <Link
                href="#"
                className="flex items-center gap-1 pt-2 pb-1.5 text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]"
              >
                Instagram <ExternalLinkIcon />
              </Link>
            </div>
          </div>

          <div className="hidden md:block flex-1" />

          {/* Contact Us — desktop only (inline) */}
          <div className="hidden md:flex flex-col gap-4 min-w-55">
            <span className="text-ink-muted text-xs font-medium leading-none tracking-[-0.24px]">
              Contact Us
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
                E-mail
              </span>
              <div className="border-b border-border-dark md:border-0 pb-4 mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]">
                    info@bitsika.com
                  </span>
                  <CopyButton value="info@bitsika.com" />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-1">
              <span className="text-white text-xs font-medium leading-none tracking-[-0.24px]">
                Phone Number
              </span>
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]">
                    +233 (0) 123-249-5839
                  </span>
                  <CopyButton value="+2330123-249-5839" />
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-t border-border-dark" />

        <div className="py-5">
          <span className="text-ink-muted text-xs font-normal leading-none tracking-[-0.12px]">
            © Bitsika 2026. All right reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
}
