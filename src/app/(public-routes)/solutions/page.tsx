import { actions } from '@/actions'
import PageTitle from '@/components/page-title'

export default async function SolutionsPage() {
  const solutions = await actions.client.getServices()

  return (
    <>
      <PageTitle title="Discover Exclusive Services: Explore Offers, Prices and Schedules" />
      {solutions && <pre>{JSON.stringify(solutions, null, 2)}</pre>}
    </>
  )
}
