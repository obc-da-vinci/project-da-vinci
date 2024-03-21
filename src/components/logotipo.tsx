import Image from 'next/image'
import Link from 'next/link'

export default function Logotipo({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Image
        src="/images/logotipo.png"
        height={100}
        width={100}
        alt="Logotipo Vinci Sphere"
        priority
        style={{ width: 'auto', height: 'auto' }}
      />
    </Link>
  )
}
