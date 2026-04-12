import Container from "../layout/Container";
import ComparisonTable from "../ui/ComparisonTable";
import type { TableContent } from "@/content/shape";

type ComparisonProps = {
  table: TableContent;
};

export default function Comparison({ table }: ComparisonProps) {
  return (
    <section className="bg-white pb-20">
      <Container>
        <section className="pt-11 md:pt-20.75 pb-10.25 md:pb-13.75 flex flex-col gap-7">
          <h2 className="max-w-180 font-google-sans font-normal text-2xl md:text-[40px] leading-[114%] tracking-[-0.01em]">
            {table.heading}
          </h2>
          <p className="max-w-168.5  font-normal text-base leading-[130%] tracking-[-0.01em] text-ink-secondary">
            {table.text}
          </p>
        </section>
        <ComparisonTable table={table} />
      </Container>
    </section>
  );
}
