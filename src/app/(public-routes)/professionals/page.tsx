import PageTitle from '@/components/page-title'
import { getProfessionals } from '@/services/client'
import { Professional } from '@prisma/client'

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals()

  const Render = ({ professionals }: { professionals: Professional[] }) => (
    <div className="grid sm:grid-cols-2 md:grid-cols-3">
      {professionals.map((p) => (
        <div
          key={p.id}
          className="m-2 inline-flex flex-col rounded-lg border bg-neutral-100 p-2 shadow-md"
        >
          <span className="font-medium">{p.name}</span>
          <span>{p.email}</span>
          <button className="p-2">Select</button>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <PageTitle title="Find your Specialist: Explore Professionals and Schedule Services" />
      <Render professionals={professionals} />
    </>
  )
}
