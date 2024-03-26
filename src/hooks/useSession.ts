'use server'

import { actions } from '@/actions'
import { cookies } from 'next/headers'

export async function useSession() {
  const token = cookies().get('obc-da-vinci')
  if (!token || !token.value) return null

  const response = await actions.auth.openSessionToken(token.value)

  const user = {
    id: String(response.sub),
    name: String(response.name),
    email: String(response.email),
  }

  return user
}
