import Container from '@/components/layout/Container'
import InfoCard from '@/components/ui/InfoCard'

type InfoBlockProps = {
  cards: {
    title: string
    description: string
    checklistItems: string[]
  }[]
}

export default function InfoBlock({ cards }: InfoBlockProps) {
  return (
    <section className="bg-surface-subtle py-12.75 md:py-18.75 ">
      <Container>
        <div className="grid grid-cols-3 gap-16 md:gap-5 max-lg:grid-cols-1">
          {cards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </Container>
    </section>
  )
}
