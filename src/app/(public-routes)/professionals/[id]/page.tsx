import { actions } from '@/actions'
import PageTitle from '@/components/page-title'

export default async function ProfessionalAvailabilityPage({
  params,
}: {
  params: { id: string }
}) {
  const availability = await actions.client.getProfessionalAvailability(
    params.id,
  )
  const professionalName = availability[0].professional.name

  return (
    <div>
      <PageTitle title={`Schedule an appointment with ${professionalName}`} />
      {JSON.stringify(availability, null, 2)}
    </div>
  )
}
