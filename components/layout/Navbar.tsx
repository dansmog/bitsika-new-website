import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import SearchBar from '@/components/ui/SearchBar'
import CountrySelector from '@/components/ui/CountrySelector'

export default function Navbar() {
  return (
    <nav className="">
      <Container className="flex items-center gap-3 md:gap-6 pt-5 md:pt-6 pb-5 md:pb-7">

        <Link href="/" aria-label="Bitsika home" className="shrink-0">
          <Image
            src="/images/bitsika-logo.png"
            alt="Bitsika"
            width={94}
            height={35.96}
            className="object-contain w-21.75 h-auto lg:w-23.5"
            priority
          />
        </Link>

        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        <CountrySelector />
      </Container>
    </nav>
  )
}
