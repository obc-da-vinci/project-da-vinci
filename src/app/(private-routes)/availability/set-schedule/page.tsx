import PreviousButton from '@/components/previous-button'
import SetAvailability from '@/components/set-availability'
import { useSession } from '@/hooks/useSession'

export default async function SetSchedulesPage() {
  const user = await useSession()

  return (
    <div>
      <PreviousButton path="/availability" />
      <SetAvailability professionalId={user.id} />
    </div>
  )
}
