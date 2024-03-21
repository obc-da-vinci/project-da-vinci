'use server'

import { cookies } from 'next/headers'
import { openSessionToken } from '@/actions'

export async function useSession() {
  const token = cookies().get('obc-da-vinci')

  if (!token || !token.value) return

  const response = await openSessionToken(token.value)

  const user = {
    id: String(response.sub),
    name: String(response.name),
    email: String(response.email),
  }

  return user
}
