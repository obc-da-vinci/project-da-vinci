import PageTitle from '@/components/page-title'

export default async function ProfessionalAvailabilityPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div>
      <PageTitle title="Schedule an appointment" />
      <h1>{params.id}</h1>
    </div>
  )
}
