import AppointmentForm from '@/components/forms/appointment-form'
import PreviousButton from '@/components/previous-button'

interface Props {
  searchParams: { back: string; id: string }
}

export default async function AppointmentPage({ searchParams }: Props) {
  const goBack = searchParams.back
  const professionalId = searchParams.id

  return (
    <div>
      <PreviousButton path={goBack} />
      <AppointmentForm />
    </div>
  )
}
