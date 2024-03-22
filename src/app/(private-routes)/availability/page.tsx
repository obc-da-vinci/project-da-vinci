import { getSelfAvailability } from '@/services/professional'
import Link from 'next/link'

export default async function AvailabilityPage() {
  const availability = await getSelfAvailability()

  return (
    <div>
      <h1>Availability Page</h1>
      <Link href="/availability/set-schedule">Set your availability</Link>
      {availability && <pre>{JSON.stringify(availability, null, 2)}</pre>}
    </div>
  )
}
