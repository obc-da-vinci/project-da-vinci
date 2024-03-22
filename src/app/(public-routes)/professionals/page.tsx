import { getProfessionals } from '@/services/client'

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals()

  return (
    <div>
      <h1>Professionals Page</h1>
      {professionals && <pre>{JSON.stringify(professionals, null, 2)}</pre>}
    </div>
  )
}
