import { Button } from '@nextui-org/react'
import Link from 'next/link'

interface Props {
  href: {
    pathname: string
    query: Record<string, string>
  }
}

export default function ButtonRequestAppointment({ href }: Props) {
  return (
    <Link href={href}>
      <Button color="primary" size="sm" className="w-full font-medium">
        request an appointment
      </Button>
    </Link>
  )
}
