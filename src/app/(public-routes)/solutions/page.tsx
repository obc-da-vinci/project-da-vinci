import { actions } from '@/actions'
import ButtonRequestAppointment from '@/components/button-request-appointment'
import PageTitle from '@/components/page-title'
import { SolutionsWithProfessionalName } from '@/lib/types'

export default async function SolutionsPage() {
  const solutions = await actions.client.getServices()

  const RenderSolutions = ({
    solutions,
  }: {
    solutions: SolutionsWithProfessionalName[]
  }) => (
    <>
      {solutions.map((solution) => (
        <div
          key={solution.id}
          className="mb-5 flex flex-col space-y-3 rounded-xl border-2 bg-slate-100 p-5 shadow"
        >
          <span className="inline-flex gap-1.5">
            <b className="text-blue-500">Professional:</b>
            {solution.professional.name}
          </span>
          <span className="inline-flex gap-1.5">
            <b className="text-blue-500">Service:</b>
            {solution.serviceName}
          </span>
          <span className="flex flex-col">
            <b className="text-blue-500">Description:</b>
            {solution.description}
          </span>
          <span className="inline-flex gap-1.5">
            <b className="text-blue-500">Price:</b>
            {solution.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
          <div className="flex justify-end">
            <ButtonRequestAppointment
              href={{
                pathname: '/appointment',
                query: { back: '/solutions' },
              }}
            />
          </div>
        </div>
      ))}
    </>
  )

  return (
    <>
      <PageTitle title="Discover Exclusive Services: Explore Offers, Prices and Schedules" />
      {solutions && <RenderSolutions solutions={solutions} />}
    </>
  )
}
