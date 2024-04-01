import { actions } from '@/actions'
import UpsertServiceModal from '@/components/modal/upsert-service'
import PageTitle, { PageTitleWrapper } from '@/components/page-title'
import { useSession } from '@/hooks/useSession'
import { Services } from '@prisma/client'

export default async function ServicesPage() {
  const user = await useSession()
  if (!user) return null

  const myServices = await actions.user.getServices(user.id)

  const RenderServices = ({ services }: { services: Services[] }) => (
    <>
      {services.length >= 1 ? (
        <>
          {services.map((service) => (
            <div
              key={service.id}
              className="mb-5 flex flex-col space-y-3 rounded-xl border-2 bg-slate-100 p-5 shadow"
            >
              <span className="inline-flex gap-1.5">
                <b className="text-blue-500">Service:</b>
                {service.serviceName}
              </span>
              <span>
                <b className="mr-1.5 text-blue-500">Description:</b>
                {service.description}
              </span>
              <span className="inline-flex gap-1.5">
                <b className="text-blue-500">Price:</b>
                {service.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
          ))}
        </>
      ) : (
        <p>No services registered</p>
      )}
    </>
  )

  return (
    <>
      <PageTitleWrapper>
        <PageTitle title="Manage Services: View, Edit and Delete your Offers" />
        <div className="flex w-full justify-end">
          <UpsertServiceModal professionalId={user.id} />
        </div>
      </PageTitleWrapper>
      {myServices && <RenderServices services={myServices} />}
    </>
  )
}
