type RatingsProps = {
  googlePlayStat: string;
  userCount: string;
};

const Ratings = ({ googlePlayStat, userCount }: RatingsProps) => {
  return (
    <div className="flex items-center shrink-0 flex-wrap py-2.5">
      <div className="gap-2 flex items-center">
        <div className="flex items-center gap-0.3">
          {/* Single star on mobile */}
          <svg
            className="lg:hidden"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1435 1.55185C10.6833 0.593823 9.31614 0.59382 8.85591 1.55185L6.88748 5.64939L2.35355 6.24305C1.30242 6.38068 0.864738 7.67952 1.64737 8.41748L4.96063 11.5416L4.12912 16.0021C3.93171 17.0611 5.05286 17.8461 5.9791 17.3468L9.99971 15.1792L14.0203 17.3468C14.9466 17.8461 16.0677 17.0611 15.8703 16.0021L15.0388 11.5416L18.352 8.41748C19.1347 7.67952 18.697 6.38068 17.6459 6.24305L13.1119 5.64939L11.1435 1.55185Z"
              fill="white"
            />
          </svg>
          {/* All stars on desktop */}
          {[...Array(4)].map((_, i) => (
            <svg
              key={i}
              className="hidden lg:block"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1435 1.55185C10.6833 0.593823 9.31614 0.59382 8.85591 1.55185L6.88748 5.64939L2.35355 6.24305C1.30242 6.38068 0.864738 7.67952 1.64737 8.41748L4.96063 11.5416L4.12912 16.0021C3.93171 17.0611 5.05286 17.8461 5.9791 17.3468L9.99971 15.1792L14.0203 17.3468C14.9466 17.8461 16.0677 17.0611 15.8703 16.0021L15.0388 11.5416L18.352 8.41748C19.1347 7.67952 18.697 6.38068 17.6459 6.24305L13.1119 5.64939L11.1435 1.55185Z"
                fill="white"
              />
            </svg>
          ))}
          {/* Half star — desktop only */}
          <svg
            className="hidden lg:block"
            width="16"
            height="15"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.89545 0.718521C9.43523 -0.239505 8.06809 -0.239508 7.60786 0.71852L5.63944 4.81606L1.1055 5.40972C0.0543692 5.54735 -0.383309 6.84619 0.399327 7.58416L3.71258 10.7083L2.88108 15.1687C2.68366 16.2277 3.80481 17.0128 4.73106 16.5135L8.75166 14.3459L12.7723 16.5135C13.6985 17.0128 14.8197 16.2277 14.6222 15.1687L13.7907 10.7083L17.104 7.58416C17.8866 6.84619 17.4489 5.54735 16.3978 5.40972L11.8639 4.81606L9.89545 0.718521Z"
              fill="url(#paint0_linear_358_351)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_358_351"
                x1="0"
                y1="8.33375"
                x2="17.5033"
                y2="8.33375"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.442308" stopColor="white" />
                <stop offset="0.485577" stopColor="#494949" />
                <stop offset="1" stopColor="#494949" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-white  tracking-[-0.28px] whitespace-nowrap text-[13px] md:text-sm font-medium">
          {googlePlayStat}
        </span>
      </div>
      <div className="w-px h-4 bg-white/30 mx-1" />
      <span className="text-white text-[13px] md:text-sm items-center flex gap-1 font-medium tracking-[-0.28px]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8479 13.7383C10.8313 11.3039 8.78756 10 6.66627 10C4.54497 10 2.50126 11.3039 1.48465 13.7383C1.07038 14.7303 1.32231 15.7104 1.91328 16.4049C2.48912 17.0815 3.38748 17.5 4.3487 17.5H8.98383C9.94505 17.5 10.8434 17.0815 11.4193 16.4049C12.0102 15.7104 12.2622 14.7303 11.8479 13.7383Z"
            fill="white"
          />
          <path
            d="M3.33309 5.83333C3.33309 3.99238 4.82547 2.5 6.66642 2.5C8.50737 2.5 9.99976 3.99238 9.99976 5.83333C9.99976 7.67428 8.50737 9.16667 6.66642 9.16667C4.82547 9.16667 3.33309 7.67428 3.33309 5.83333Z"
            fill="white"
          />
          <path
            d="M11.2498 6.25C11.2498 4.63917 12.5556 3.33333 14.1664 3.33333C15.7773 3.33333 17.0831 4.63917 17.0831 6.25C17.0831 7.86083 15.7773 9.16667 14.1664 9.16667C12.5556 9.16667 11.2498 7.86083 11.2498 6.25Z"
            fill="white"
          />
          <path
            d="M11.8305 10.6446C12.4608 11.3278 12.991 12.1504 13.3859 13.096C13.918 14.3701 13.7738 15.6415 13.2398 16.6667H15.7721C16.7339 16.6667 17.6387 16.2431 18.208 15.5626C18.7967 14.8589 19.0289 13.8603 18.5366 12.8769C17.5986 11.003 15.9134 10 14.1688 10C13.3529 10 12.55 10.2194 11.8305 10.6446Z"
            fill="white"
          />
        </svg>
        {userCount}
      </span>
    </div>
  );
};

export default Ratings;
