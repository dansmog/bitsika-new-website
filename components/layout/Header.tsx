import Navbar from '@/components/layout/Navbar'
import HeroBanner from '@/components/sections/HeroBanner'

export default function Header() {
  return (
    <header className='pb-5.75 bg-surface-subtle border-b border-border-default'>
      <Navbar />
      <HeroBanner />
    </header>
  )
}
