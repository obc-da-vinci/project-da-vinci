import { getSelfAvailability } from '@/services/professional'

export default async function AvailabilityPage() {
  const availability = await getSelfAvailability()

  return (
    <div>
      <h1>Availability Page</h1>
      {availability && <pre>{JSON.stringify(availability, null, 2)}</pre>}
    </div>
  )
}
