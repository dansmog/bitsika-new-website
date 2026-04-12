import { splitBold } from "@/lib/formatText";

type DownloadButtonProps = {
  desktopLabel: string;
  mobileLabel: string;
};

function AppStoreButton({ desktopLabel, mobileLabel }: DownloadButtonProps) {
  const mobile = splitBold(mobileLabel);
  return (
    <span
      aria-disabled="true"
      className="flex items-center whitespace-nowrap tracking-[-0.02em] gap-2 px-3.75 py-2.5 bg-surface-white text-ink text-sm font-medium rounded-xl  max-lg:border max-lg:border-[#E0E0E0] max-lg:px-2.75 max-lg:py-2.75 max-lg:gap-3">
      <svg
        className="order-first lg:order-last w-3.75 h-4.25 max-lg:w-6.25 max-lg:h-7"
        viewBox="0 0 15 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_219_733)">
          <path
            d="M12.0152 8.42058C12.0289 7.80991 12.2017 7.21259 12.5175 6.68455C12.8333 6.1565 13.2818 5.715 13.8209 5.40136C13.4667 4.93188 13.0074 4.54675 12.4777 4.27504C11.9481 4.00333 11.3618 3.85214 10.7633 3.83287C9.4767 3.70422 8.22983 4.56318 7.57433 4.56318C6.90662 4.56318 5.8969 3.84475 4.80983 3.86652C3.39399 3.91006 2.07281 4.67402 1.38372 5.84964C-0.0972605 8.28402 1.00711 11.8623 2.42703 13.8306C3.13647 14.7945 3.96603 15.8712 5.0531 15.8326C6.11472 15.791 6.51169 15.1893 7.79419 15.1893C9.06447 15.1893 9.43701 15.8326 10.5455 15.8088C11.6855 15.791 12.403 14.84 13.0891 13.8672C13.5977 13.1831 13.9902 12.424 14.2515 11.6189C12.912 11.0816 12.0173 9.80105 12.0152 8.42058ZM9.92354 2.5385C10.5444 1.82995 10.8508 0.919537 10.7765 0.000213623C9.83182 0.0924835 8.95611 0.522763 8.3194 1.20751C8.01413 1.53818 7.77954 1.92456 7.62926 2.34418C7.47898 2.7638 7.41602 3.20828 7.44404 3.65178C7.91614 3.65507 8.38316 3.55699 8.81177 3.36455C9.24038 3.17211 9.62 2.89004 9.92354 2.5385Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_219_733">
            <rect width="14.0521" height="16.0595" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <span className="hidden lg:inline">{desktopLabel}</span>

      <span className="flex flex-col items-start lg:hidden">
        <span className="text-[10px] font-normal leading-none">
          {mobile.prefix}
        </span>
        <span className="text-base font-semibold leading-tight">
          {mobile.emphasis}
        </span>
      </span>
    </span>
  );
}

function GooglePlayButton({ desktopLabel, mobileLabel }: DownloadButtonProps) {
  const mobile = splitBold(mobileLabel);
  return (
    <a
      href="https://play.google.com/store/apps/details?id=africa.bitsika.bitsika_mobile&hl=en_GB&gl=gh"
      target="_blank"
      rel="noopener noreferrer"
      className="flex cursor-pointer items-center whitespace-nowrap gap-2 tracking-[-0.02em] px-3.75 py-2.5 bg-ink text-white text-sm font-medium border border-[#3A3A3A] rounded-xl  max-lg:px-2.75 max-lg:py-2.75 max-lg:gap-3">
      {/* Icon — shown left on mobile, right on desktop */}
      <svg
        className="order-first lg:order-last w-4.25 h-4 max-lg:w-7.25 max-lg:h-7"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_219_738)">
          <path
            d="M8.66254 7.55996L1.90625 14.5167L1.90725 14.5207C2.01619 14.9008 2.24759 15.2349 2.56596 15.4717C2.88432 15.7086 3.27208 15.8351 3.66976 15.8319C4.00732 15.8319 4.32398 15.7428 4.59582 15.5885L4.61773 15.5756L12.2224 11.3194L8.66254 7.55996Z"
            fill="#EA4335"
          />
          <path
            d="M15.4943 6.37786L15.4873 6.37391L12.2043 4.52734L8.505 7.71974L12.2172 11.3198L15.4833 9.49208C16.0559 9.19224 16.4443 8.6074 16.4443 7.93151C16.4443 7.26156 16.0609 6.6787 15.4943 6.37786Z"
            fill="#FBBC04"
          />
          <path
            d="M1.90512 1.31842C1.86529 1.4629 1.84338 1.6153 1.84338 1.77363V14.0643C1.84338 14.2226 1.86429 14.376 1.90512 14.5195L8.89541 7.74181L1.90512 1.31842Z"
            fill="#4285F4"
          />
          <path
            d="M8.71233 7.91667L12.2095 4.52536L4.61175 0.253334C4.32598 0.0872124 4.00083 -0.00023192 3.66976 4.61956e-07C2.82534 4.61956e-07 2.11237 0.557136 1.90625 1.31318V1.31516L8.71233 7.91667Z"
            fill="#34A853"
          />
        </g>
        <defs>
          <clipPath id="clip0_219_738">
            <rect width="16.5734" height="15.8828" fill="white" />
          </clipPath>
        </defs>
      </svg>

      {/* Desktop: inline text */}
      <span className="hidden lg:inline">{desktopLabel}</span>

      {/* Mobile: stacked text */}
      <span className="flex flex-col items-start lg:hidden">
        <span className="text-[10px] font-normal leading-none">
          {mobile.prefix}
        </span>
        <span className="text-base font-semibold leading-tight">
          {mobile.emphasis}
        </span>
      </span>
    </a>
  );
}

export { AppStoreButton, GooglePlayButton };
