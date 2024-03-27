import Link from 'next/link'

export default function NavbarItem({
  label,
  href,
  small,
}: {
  label: string
  href: string
  small?: boolean
}) {
  return (
    <li
      className={`transition-colors duration-300 
        ${
          small
            ? 'mb-2 flex rounded-lg text-center transition-colors duration-300 hover:bg-blue-500 hover:text-white'
            : 'hover:text-blue-500'
        }`}
      style={{ listStyle: 'none' }}
    >
      <Link href={href} className="flex-1 p-2">
        {label}
      </Link>
    </li>
  )
}
