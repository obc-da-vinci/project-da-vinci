import { actions } from '@/actions'
import PageTitle from '@/components/page-title'
import TableAvailability from '@/components/table-availability'
import { useSession } from '@/hooks/useSession'

export default async function AvailabilityPage() {
  const user = await useSession()
  const availability = await actions.user.getAvailability(user.id)

  return (
    <div>
      <PageTitle title="Manage Availability: Set Your Schedule and Appointment Times" />
      <TableAvailability availability={availability} />
    </div>
  )
}
