import SetAvailability from '@/components/set-availability'
import Link from 'next/link'

export default function SetSchedulesPage() {
  return (
    <div>
      <Link href="/availability">Previous</Link>
      <SetAvailability />
    </div>
  )
}
