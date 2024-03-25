import PageTitle from '@/components/page-title'
import { getSolutions } from '@/services/client'

export default async function SolutionsPage() {
  const solutions = await getSolutions()

  return (
    <>
      <PageTitle title="Discover Exclusive Services: Explore Offers, Prices and Schedules" />
      {solutions && <pre>{JSON.stringify(solutions, null, 2)}</pre>}
    </>
  )
}
