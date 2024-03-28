import { ReactNode } from 'react'

export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="mx-auto my-5 w-full text-center font-light sm:text-lg md:text-start md:text-xl">
      {title}
    </h1>
  )
}

export function PageTitleWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
      {children}
    </div>
  )
}
