import Image, { StaticImageData } from 'next/image'

type GameCardProps = {
  image: StaticImageData
  title: string
  subtitle: string
}

export default function GameCard({ image, title, subtitle }: GameCardProps) {
  return (
    <div className="flex flex-col gap-4 cursor-pointer">
      <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[#008CDF] font-[Inter_Variable] text-sm font-medium leading-[130%] tracking-[-0.14px]">{title}</span>
        <span className="text-[#323232] font-google-sans text-base font-normal leading-[120%]">{subtitle}</span>
      </div>
    </div>
  )
}
