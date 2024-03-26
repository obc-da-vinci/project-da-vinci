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
      <PageTitle title={`Schedule an appointment with ${professional.name}`} />
      <h1>{params.id}</h1>
    </div>
  )
}
