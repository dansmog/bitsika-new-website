import Container from "@/components/layout/Container";

const providers = [
  {
    name: "MetaMask Card",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#F6F6F6"/>
        <g transform="translate(4, 4)">
          <path d="M27.5 5L18.7 11.65L20.35 7.7L27.5 5Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.49 5L13.2 11.71L11.65 7.7L4.49 5Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24.44 20.9L22.1 24.43L27 25.73L28.36 20.98L24.44 20.9Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.65 20.98L5 25.73L9.9 24.43L7.56 20.9L3.65 20.98Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.63 14.65L8.31 16.67L13.17 16.89L13 11.65L9.63 14.65Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.36 14.65L18.94 11.58L18.83 16.89L23.68 16.67L22.36 14.65Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.9 24.43L12.87 23.05L10.3 21.01L9.9 24.43Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.12 23.05L22.1 24.43L21.69 21.01L19.12 23.05Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    ),
  },
  {
    name: "Coinbase Card",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#1652F0"/>
        <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 25.5C17.015 25.5 14.5 22.985 14.5 20C14.5 17.015 17.015 14.5 20 14.5C22.563 14.5 24.725 16.2 25.35 18.5H22C21.55 17.625 20.85 17 20 17C18.619 17 17.5 18.343 17.5 20C17.5 21.657 18.619 23 20 23C20.85 23 21.55 22.375 22 21.5H25.35C24.725 23.8 22.563 25.5 20 25.5Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "CashApp Card",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#00D64F"/>
        <path d="M22.08 13.52C21.32 13.28 20.54 13.18 19.76 13.18C17.12 13.18 15.36 14.6 15.36 16.76C15.36 18.58 16.6 19.56 18.36 20.12L19.28 20.42C20.44 20.8 20.96 21.14 20.96 21.82C20.96 22.58 20.18 23.04 18.96 23.04C17.82 23.04 16.72 22.68 15.78 22.06L15 24.12C16.08 24.76 17.44 25.12 18.86 25.12C21.72 25.12 23.6 23.64 23.6 21.38C23.6 19.5 22.36 18.52 20.46 17.92L19.54 17.62C18.52 17.28 17.98 16.96 17.98 16.34C17.98 15.66 18.66 15.26 19.72 15.26C20.68 15.26 21.6 15.54 22.4 16.02L22.08 13.52ZM21.44 11L20.98 12.86C20.58 12.78 20.18 12.74 19.76 12.74C19.56 12.74 19.36 12.74 19.16 12.76L18.68 11H21.44ZM18.56 26.3L18.12 28H20.88L21.34 26.14C21.74 26.22 22.14 26.28 22.56 26.3L18.56 26.3Z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Binance Card",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#F8F8F8"/>
        <path d="M20 8L22.9 10.9L16.2 17.6L13.3 14.7L20 8Z" fill="#F3BA2F"/>
        <path d="M23.8 11.8L26.7 14.7L16.2 25.2L13.3 22.3L23.8 11.8Z" fill="#F3BA2F"/>
        <path d="M10.4 17.6L13.3 14.7L16.2 17.6L13.3 20.5L10.4 17.6Z" fill="#F3BA2F"/>
        <path d="M26.7 20.5L29.6 17.6L32 20L29.1 22.9L26.7 20.5Z" fill="#F3BA2F"/>
        <path d="M16.2 25.2L19.1 22.3L22 25.2L19.1 28.1L16.2 25.2Z" fill="#F3BA2F"/>
      </svg>
    ),
  },
  {
    name: "Revolut Card",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#F6F6F6"/>
        <path d="M15 10H22.5C25.538 10 28 12.462 28 15.5C28 17.616 26.847 19.462 25.125 20.463L28.5 30H24.75L21.675 21.5H18.5V30H15V10ZM18.5 18H22.5C23.605 18 24.5 17.105 24.5 16C24.5 14.895 23.605 14 22.5 14H18.5V18Z" fill="#191C1F"/>
      </svg>
    ),
  },
];

const comparisons = [
  providers[0], providers[1], providers[2], providers[3],
  providers[1], providers[2], providers[4], providers[0],
  providers[3], providers[4], providers[0], providers[2],
  providers[1], providers[2], providers[4], providers[0],
];

export default function BuiltDifferent() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="font-google-sans font-normal text-[40px] leading-[114%] tracking-[-0.01em] text-ink">
            Built Different. On Purpose.
          </h2>
          <p className=" font-normal text-base leading-[130%] tracking-[-0.01em] text-ink-secondary">
            See how Bitsika compares to traditional cards and other virtual card providers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          {comparisons.map((provider, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-surface-subtle rounded-[20px] px-6 py-5.25"
            >
              <div className="shrink-0">{provider.icon}</div>
              <div className="flex flex-row md:flex-col">
                <span className=" font-semibold text-sm leading-[130%] text-ink">
                  Bitsika vs.
                </span>
                <span className=" font-semibold text-sm leading-[130%] text-ink">
                  {provider.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
