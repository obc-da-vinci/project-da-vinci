import { actions } from '@/actions'
import AppointmentForm from '@/components/forms/appointment-form'
import PreviousButton from '@/components/previous-button'

interface Props {
  searchParams: { back: string; id: string }
}

export default async function AppointmentPage({ searchParams }: Props) {
  const goBack = searchParams.back
  const professionalId = searchParams.id

  const availability =
    await actions.client.getProfessionalAvailability(professionalId)

  const availableDays = availability.map((item) => item.dayOfWeek)

  const isDayVailable = (date: Date) => availableDays.includes(date.getDay())

  const getAvailableDays = () => {
    const next30days = []
    const currentDay = new Date()

    while (next30days.length < 30) {
      if (isDayVailable(currentDay)) {
        next30days.push(new Date(currentDay))
      }
      currentDay.setDate(currentDay.getDate() + 1)
    }

    return next30days
  }

  const dateOptions = getAvailableDays()
  const timeOptions = []

  return (
    <div>
      <PreviousButton path={goBack} />
      <AppointmentForm dateOptions={dateOptions} />
      {JSON.stringify(availability[0].startTime)}
      {JSON.stringify(availability[0].endTime)}
    </div>
  )
}
