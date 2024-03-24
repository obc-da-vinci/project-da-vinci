import SetAvailability from '@/components/set-availability'
import { useSession } from '@/hooks/useSession'
import Link from 'next/link'

export default async function SetSchedulesPage() {
  const user = await useSession()

  if (!user) return null

  return (
    <div>
      <Link href="/availability">Previous</Link>
      <SetAvailability professionalId={user.id} />
    </div>
  )
}
