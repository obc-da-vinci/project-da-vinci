import { actions } from '@/actions'
import ButtonAppointmentStatus from '@/components/appointment-status-button'
import PageTitle from '@/components/page-title'
import { useSession } from '@/hooks/useSession'
import { Hours } from '@/lib/types'
import { Appointments } from '@prisma/client'

export default async function AppointmentsPage() {
  const user = await useSession()
  if (!user) return null
  const appointments = await actions.user.getAppointments(user.id)

  const RenderAppointment = ({
    appointments,
  }: {
    appointments: Appointments[]
  }) => (
    <div className="flex flex-wrap">
      {appointments.map((item) => (
        <div
          key={item.id}
          className="mb-5 flex w-full flex-col rounded-xl border-2 bg-slate-100 p-5 shadow sm:w-1/2 lg:w-1/3"
        >
          <span>
            <b>Name:</b> {item.clientName}
          </span>
          <span>
            <b>E-mail:</b> {item.clientEmail}
          </span>
          <span>
            <b>Telephone:</b> {item.clientPhoneNumber}
          </span>
          <span>
            <b>Message:</b> {item.textMessage || 'empty'}
          </span>
          <p>
            <b>Date:</b>{' '}
            {item.date.toLocaleDateString('en-US', {
              dateStyle: 'medium',
            })}
          </p>
          <p>
            <b>Start at:</b>{' '}
            {Hours.find((hour) => hour.value === item.startTime)?.label || '-'}{' '}
            h
          </p>
          <p>
            <b>End at:</b>{' '}
            {Hours.find((hour) => hour.value === item.endTime)?.label || '-'} h
          </p>
          <footer className="mt-5 flex flex-col gap-2.5">
            <ButtonAppointmentStatus status="ACCEPT" />
            <ButtonAppointmentStatus status="REJECTED" />
          </footer>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <PageTitle title="Manage Appointment Requests" />
      {appointments && <RenderAppointment appointments={appointments} />}
    </div>
  )
}
