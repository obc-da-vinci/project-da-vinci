import PageTitle from '@/components/page-title'
import { getSelfAvailability } from '@/services/professional'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { BsClock } from 'react-icons/bs'

export default async function AvailabilityPage() {
  const availability = await getSelfAvailability()

  return (
    <div>
      <PageTitle title="Manage Availability: Set Your Schedule and Appointment Times" />
      <div className="flex justify-end">
        <Link href="/availability/set-schedule">
          <Button color="primary" className="font-medium">
            <BsClock color="white" size={18} /> Set your availability
          </Button>
        </Link>
      </div>
      {availability && <pre>{JSON.stringify(availability, null, 2)}</pre>}
    </div>
  )
}
