import { actions } from '@/actions'
import PreviousButton from '@/components/previous-button'
import SetAvailability from '@/components/set-availability'
import { useSession } from '@/hooks/useSession'

export default async function SetSchedulesPage() {
  const user = await useSession()
  if (!user) return null

  const availability = await actions.user.getAvailability(user.id)

  return (
    <div>
      <PreviousButton path="/availability" />
      <SetAvailability professionalId={user.id} availability={availability} />
    </div>
  )
}
