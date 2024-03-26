import PageTitle from '@/components/page-title'
import { getProfessionalById } from '@/services/client'

export default async function ProfessionalAvailabilityPage({
  params,
}: {
  params: { id: string }
}) {
  const { professional } = await getProfessionalById(params.id)

  return (
    <div>
      <PageTitle title="Schedule an appointment" />
      <h1>{params.id}</h1>
      {professional && <p>{professional.name}</p>}
    </div>
  )
}
