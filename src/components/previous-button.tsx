import Link from 'next/link'
import { FcPrevious } from 'react-icons/fc'

export default function PreviousButton({ path }: { path: string }) {
  return (
    <Link
      href={path}
      className="mb-5 inline-flex items-center gap-1.5 hover:text-blue-500"
    >
      <FcPrevious /> Previous
    </Link>
  )
}
