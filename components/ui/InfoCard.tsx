type InfoCardProps = {
  title: string;
  description: string;
  checklistItems: string[];
};

export default function InfoCard({
  title,
  description,
  checklistItems,
}: InfoCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-ink text-xl font-google-sans font-semibold">
          {title}
        </h3>
        <p className="text-ink-secondary text-base font-normal leading-[130%] tracking-[-0.16px]">
          {description}
        </p>
      </div>

      <ul className="flex flex-col">
        {checklistItems.map((item, index) => (
          <li
            key={index}
            className="flex  gap-3 py-2.25 border-b items-center border-border-default first:border-t first:border-border-default"
          >
            <div className="shrink-0">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.7953 1.5965C11.0181 1.75955 11.0666 2.0724 10.9036 2.29527L5.05061 10.2953C4.97028 10.4051 4.84867 10.4774 4.71384 10.4956C4.57901 10.5137 4.4426 10.4762 4.33607 10.3915L1.18901 7.89154C0.972791 7.71977 0.936752 7.40525 1.10852 7.18903C1.28028 6.97281 1.59481 6.93677 1.81103 7.10853L4.55073 9.28493L10.0965 1.7048C10.2595 1.48194 10.5724 1.43345 10.7953 1.5965Z"
                  fill="#5A5A5A"
                />
              </svg>
            </div>

            <span className="text-ink-secondary text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
