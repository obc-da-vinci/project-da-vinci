import { actions } from '@/actions'
import UpsertServiceModal from '@/components/modal/upsert-service'
import PageTitle, { PageTitleWrapper } from '@/components/page-title'
import { useSession } from '@/hooks/useSession'

export default async function ServicesPage() {
  const user = await useSession()
  if (!user) return null

  const myServices = await actions.user.getServices(user.id)

  return (
    <>
      <PageTitleWrapper>
        <PageTitle title="Manage Services: View, Edit and Delete your Offers" />
        <div className="flex w-full justify-end">
          <UpsertServiceModal professionalId={user.id} />
        </div>
      </PageTitleWrapper>
      {myServices && <pre>{JSON.stringify(myServices, null, 2)}</pre>}
    </>
  )
}
