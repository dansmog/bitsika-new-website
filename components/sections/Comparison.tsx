import Container from "../layout/Container";
import ComparisonTable from "../ui/ComparisonTable";

export default function Comparison() {
  return (
    <section className="bg-white pb-20">
      <Container>
        <section className="pt-11 md:pt-20.75 pb-10.25 md:pb-13.75 flex flex-col gap-7">
          <h2 className="max-w-180 font-google-sans font-normal text-2xl md:text-[40px] leading-[114%] tracking-[-0.01em]">
            How Bitsika Virtual Cards Compare to Other Virtual Card Apps and
            Bank Apps.
          </h2>
          <p className="max-w-168.5  font-normal text-base leading-[130%] tracking-[-0.01em] text-ink-secondary">
            Bitsika Visa Virtual Cards stand out when compared to cards from
            other platforms. While other virtual card apps and bank-issued cards
            each have their strengths, Bitsika combines instant crypto funding,
            global reach, and full spending control in a way that others
            can't.{" "}
          </p>
        </section>
        <ComparisonTable />
      </Container>
    </section>
  );
}
