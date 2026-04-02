const rows = [
  {
    feature: 'Funding Method',
    bitsika: 'Crypto (Bitcoin and USDT) + instant balance',
    others: 'Bank transfer, sometimes card',
    bank: 'Bank account only',
  },
  {
    feature: 'KYC Required',
    bitsika: 'No',
    others: 'Often, yes',
    bank: 'Yes',
  },
  {
    feature: 'Wallet Support',
    bitsika: 'Apple Pay, Google Pay, PayPal and more',
    others: 'Sometimes',
    bank: 'Yes',
  },
  {
    feature: 'Privacy/Alias Use',
    bitsika: 'Yes',
    others: 'Rare',
    bank: 'Yes',
  },
  {
    feature: 'Prepaid',
    bitsika: 'Yes. Users get to choose how much to load on the cards.',
    others: 'Usually, but with limited funding options',
    bank: 'Not prepaid, directly linked to a bank account',
  },
  {
    feature: 'Reloadable',
    bitsika: 'Yes, with a large limit of $500,000 a month',
    others: 'Usually yes but with a small limit',
    bank: 'Yes but with a small limit',
  },
  {
    feature: 'Speed to Create',
    bitsika: '5 minutes from signup',
    others: '10–30 minutes, sometimes days',
    bank: '1–3 days or longer',
  },
  {
    feature: 'Global Reach',
    bitsika: 'Works in over 200 countries',
    others: 'Often limited',
    bank: 'Often limited to specific regions',
  },
  {
    feature: 'Security Controls',
    bitsika: 'Freeze and unfreeze, hide details, replace instantly',
    others: 'Varies',
    bank: 'Varies',
  },
  {
    feature: 'Recurring Payments',
    bitsika: 'Yes',
    others: 'Yes',
    bank: 'Yes',
  },
  {
    feature: 'Fees & Transparency',
    bitsika: 'Simple, flat fees',
    others: 'Often hidden or complex',
    bank: 'Often hidden',
  },
]

const cellBase = 'px-5 py-4 text-sm text-ink font-[Inter_Variable] align-top'
const headerBase = 'px-5 py-4 text-sm font-semibold text-left font-[Inter_Variable]'

export default function ComparisonTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border-default">
      <table className="w-full border-collapse min-w-175">
        <thead>
          <tr className="bg-surface-subtle">
            <th className={`${headerBase} text-ink w-50`}>Feature/Benefit</th>
            <th className={`${headerBase} text-white bg-brand-blue-light`}>Bitsika Virtual Visa Card</th>
            <th className={`${headerBase} text-ink`}>Other Virtual Card Apps</th>
            <th className={`${headerBase} text-ink`}>Bank Apps</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border-default">
              <td className={`${cellBase} font-semibold`}>{row.feature}</td>
              <td className={`${cellBase} bg-[#EEF6FF]`}>{row.bitsika}</td>
              <td className={cellBase}>{row.others}</td>
              <td className={cellBase}>{row.bank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
