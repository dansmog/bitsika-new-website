import type { TableContent } from "@/content/shape";

const cellBase = "px-5 py-4 text-sm text-[#505050] align-top";
const headerBase =
  "px-5 py-4 text-sm font-semibold text-left whitespace-nowrap ";

type ComparisonTableProps = {
  table: TableContent;
};

export default function ComparisonTable({ table }: ComparisonTableProps) {
  const [featureHeader, bitsikaHeader, ...otherHeaders] = table.headers;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border-default">
      <table className="w-full border-collapse min-w-175">
        <thead>
          <tr className="bg-surface-subtle">
            <th className={`${headerBase} text-ink w-50`}>{featureHeader}</th>
            <th
              className={`${headerBase} text-white bg-brand-blue-light border-l border-border-default`}
            >
              {bitsikaHeader}
            </th>
            {otherHeaders.map((header, i) => (
              <th
                key={i}
                className={`${headerBase} text-ink border-l border-border-default`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => {
            const [bitsikaCell, ...otherCells] = row.cells;
            return (
              <tr key={i} className="border-t border-border-default">
                <td className={`${cellBase} font-semibold`}>{row.label}</td>
                <td
                  className={`${cellBase} bg-[#EEF6FF] border-l border-border-default`}
                >
                  {bitsikaCell}
                </td>
                {otherCells.map((cell, j) => (
                  <td
                    key={j}
                    className={`${cellBase} border-l border-border-default`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
