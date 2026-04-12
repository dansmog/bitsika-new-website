import Image from 'next/image'
import Container from '@/components/layout/Container'
import SearchBar from '@/components/ui/SearchBar'
import CountrySelector from '@/components/ui/CountrySelector'

export default function Navbar() {
  return (
    <nav className="">
      <Container className="flex items-center gap-3 md:gap-6 pt-5 md:pt-6 pb-5 md:pb-7">

        <Image
          src="/images/bitsika-logo.png"
          alt="Bitsika"
          width={94}
          height={35.96}
          className="object-contain shrink-0 w-21.75 h-auto lg:w-23.5"
          priority
        />

        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        <CountrySelector />
      </Container>
    </nav>
  )
}
