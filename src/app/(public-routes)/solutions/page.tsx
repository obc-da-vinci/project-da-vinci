import { getSolutions } from '@/services/client'

export default async function SolutionsPage() {
  const solutions = await getSolutions()

  return (
    <div>
      <h1>Solutions Page</h1>
      {solutions && <pre>{JSON.stringify(solutions, null, 2)}</pre>}
    </div>
  )
}
