import { ProfessionalWithAvailability } from '@/lib/types'
import { Avatar } from '@nextui-org/react'
import { ReactNode } from 'react'
import RequestAppointmentModal from '../modal/request-appointment-modal'

function Header({ name, email }: { name: string; email: string }) {
  return (
    <header className="flex items-center">
      <Avatar
        showFallback
        radius="md"
        src="https://images.unsplash.com/broken"
        className="m-2"
      />
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-sm">{email}</span>
      </div>
    </header>
  )
}

function Availability({ dayOfWeek }: { dayOfWeek: number[] }) {
  return (
    <section className="my-4 grid grid-cols-6 text-sm">
      <span
        className={`mx-0.5 rounded-md border text-center ${dayOfWeek.includes(1) ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        Mon
      </span>
      <span
        className={`mx-0.5 rounded-md border text-center ${dayOfWeek.includes(2) ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        Tue
      </span>
      <span
        className={`mx-0.5 rounded-md border text-center ${dayOfWeek.includes(3) ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        Wed
      </span>
      <span
        className={`mx-0.5 rounded-md border text-center ${dayOfWeek.includes(4) ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        Thu
      </span>
      <span
        className={`mx-0.5 rounded-md border text-center ${dayOfWeek.includes(5) ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        Fri
      </span>
      <span
        className={`mx-0.5 rounded-md border text-center ${dayOfWeek.includes(6) ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        Sat
      </span>
    </section>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="m-2 inline-flex flex-col rounded-lg border bg-neutral-50 p-2 shadow-md">
      {children}
    </div>
  )
}

export default function RenderListProfessionals({
  professionals,
}: {
  professionals: ProfessionalWithAvailability[]
}) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3">
      {professionals.map((p) => (
        <Card key={p.id}>
          <Header name={p.name} email={p.email} />
          <Availability
            dayOfWeek={p.Availability.map((day) => day.dayOfWeek)}
          />
          <RequestAppointmentModal />
        </Card>
      ))}
    </div>
  )
}
