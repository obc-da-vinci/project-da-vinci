import { actions } from '@/actions'
import ButtonAppointmentStatus from '@/components/appointment-status-button'
import PageTitle from '@/components/page-title'
import { useSession } from '@/hooks/useSession'

export default async function AppointmentsPage() {
  const user = await useSession()
  if (!user) return null
  const appointments = await actions.user.getAppointments(user.id)

  return (
    <div>
      <PageTitle title="Manage Appointment Requests" />
      {appointments && <pre>{JSON.stringify(appointments, null, 2)}</pre>}
      <div className="flex gap-5">
        <ButtonAppointmentStatus id="acb123" status="ACCEPT" />
        <ButtonAppointmentStatus id="teste_novo" status="REJECTED" />
      </div>
    </div>
  )
}
