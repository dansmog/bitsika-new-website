import { ReactNode } from 'react'

export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-360 mx-auto px-25 max-xl:px-16 max-lg:px-8 max-sm:px-5 ${className}`}>
      {children}
    </div>
  )
}
