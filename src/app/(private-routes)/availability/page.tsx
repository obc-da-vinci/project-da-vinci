import PageTitle from '@/components/page-title'
import TableAvailability from '@/components/table-availability'
import { getSelfAvailability } from '@/services/professional'

export default async function AvailabilityPage() {
  const { availability } = await getSelfAvailability()

  return (
    <div>
      <PageTitle title="Manage Availability: Set Your Schedule and Appointment Times" />
      <TableAvailability availability={availability} />
    </div>
  )
}
