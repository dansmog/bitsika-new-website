'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import flagUK from '@/assets/images/countryflag/UK.svg'
import flagNG from '@/assets/images/countryflag/NG.svg'
import flagXOF from '@/assets/images/countryflag/XOF.svg'
import flagTZS from '@/assets/images/countryflag/TZS.svg'
import flagLIB from '@/assets/images/countryflag/LIB.svg'
import flagMLW from '@/assets/images/countryflag/MLW.svg'
import flagGHS from '@/assets/images/countryflag/GHS.svg'
import flagCHN from '@/assets/images/countryflag/CHN.svg'
import flagKOR from '@/assets/images/countryflag/KOR.svg'
import flagJPN from '@/assets/images/countryflag/JPN.svg'
import flagRUS from '@/assets/images/countryflag/RUS.svg'

const countries = [
  { code: 'gb', locale: 'en-gb', flag: flagUK },
  { code: 'ng', locale: 'ng-ig', flag: flagNG },
  { code: 'cm', locale: 'fr-cm', flag: flagXOF },
  { code: 'tz', locale: 'en-gb', flag: flagTZS },
  { code: 'lr', locale: 'en-gb', flag: flagLIB },
  { code: 'mw', locale: 'en-gb', flag: flagMLW },
  { code: 'gh', locale: 'en-gb', flag: flagGHS },
  { code: 'cn', locale: 'en-gb', flag: flagCHN },
  { code: 'kr', locale: 'en-gb', flag: flagKOR },
  { code: 'jp', locale: 'en-gb', flag: flagJPN },
  { code: 'ru', locale: 'en-gb', flag: flagRUS },
]

function FlagIcon({ flag }: { flag: typeof flagNG | null }) {
  if (!flag) {
    return <div className="w-5 h-5 rounded-full bg-border-input shrink-0" />
  }
  return (
    <Image
      src={flag}
      alt=""
      width={20}
      height={20}
      className="w-5 h-5 rounded-full object-cover shrink-0"
    />
  )
}

export default function CountrySelector() {
  const [selected, setSelected] = useState(countries[0])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.25 px-3 py-2 rounded-lg border border-border-input bg-surface-white cursor-pointer"
      >
        <FlagIcon flag={selected.flag} />
        <span className="hidden lg:block w-px h-4 bg-[#E1E1E1]" />
        <span className="hidden lg:block text-sm font-medium leading-none tracking-[-0.28px] text-black">{selected.locale}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="var(--color-ink-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 p-3 bg-[#F0F0F0] rounded-xl border border-[#DCDCDC] shadow-lg z-50 w-61.5 lg:w-117">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelected(country)
                  setOpen(false)
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap transition-colors ${
                  selected.code === country.code
                    ? 'border border-[#DFDFDF] bg-surface-white'
                    : 'hover:bg-surface-secondary'
                }`}
              >
                <FlagIcon flag={country.flag} />
                <span className='border border-[#E1E1E1] h-full'></span>
                <span className="text-ink">{country.locale}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
