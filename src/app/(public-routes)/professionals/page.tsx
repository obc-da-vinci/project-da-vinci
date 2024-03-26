import PageTitle from '@/components/page-title'
import { getProfessionals } from '@/services/client'
import { Professional } from '@prisma/client'
import Link from 'next/link'
import { AiOutlineSchedule } from 'react-icons/ai'

export default async function ProfessionalsPage() {
  const { professionals } = await getProfessionals()

  const Render = ({ professionals }: { professionals: Professional[] }) => (
    <div className="grid sm:grid-cols-2 md:grid-cols-3">
      {professionals.length &&
        professionals.map((p) => (
          <div
            key={p.id}
            className="m-2 inline-flex flex-col rounded-lg border bg-neutral-100 p-2 shadow-md"
          >
            <span className="font-medium">{p.name}</span>
            <span>{p.email}</span>
            <Link
              href={`/professionals/${p.id}`}
              className="my-5 flex items-center justify-center rounded-lg border bg-neutral-200 p-2 font-medium"
            >
              <AiOutlineSchedule className="mr-1.5" size={18} /> Availability
            </Link>
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
