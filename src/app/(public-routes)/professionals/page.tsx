import { actions } from '@/actions'
import PageTitle from '@/components/page-title'
import RenderListProfessionals from '@/components/renders/render-list-professionals'

export default async function ProfessionalsPage() {
  const professionals = await actions.client.getProfessionals()

  return (
    <>
      <PageTitle title="Find your Specialist: Explore Professionals and Schedule Services" />
      <RenderListProfessionals professionals={professionals} />
    </>
  )
}
