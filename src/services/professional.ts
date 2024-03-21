'use server'

import { cookies } from 'next/headers'

// Listar serviços do profissional ✅
export async function getServices() {
  const token = cookies().get('obc-da-vinci')?.value
  if (!token) return

  const res = await fetch(
    'https://project-da-vinci.vercel.app/api/private/services',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Excluir um serviço ✅
export async function deleteServices(id: string) {
  const token = cookies().get('obc-da-vinci')?.value
  if (!token) return

  const res = await fetch(
    `https://project-da-vinci.vercel.app/api/private/services?id=${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Listar agendamentos do profissional. ✅
export async function getAppointments() {
  const token = cookies().get('obc-da-vinci')?.value
  if (!token) return

  const res = await fetch(
    `https://project-da-vinci.vercel.app/api/private/appointments`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Alterar o status do agendamento (aceitar/rejeitar), ✅
// disparando uma notificação por e-mail ao cliente.
export async function changeStatusAppointments({
  id,
  status,
}: {
  id: string
  status: 'ACCEPT' | 'REJECTED'
}) {
  const token = cookies().get('obc-da-vinci')?.value
  if (!token) return

  const res = await fetch(
    `https://project-da-vinci.vercel.app/api/private/appointments?id=${id}&status=${status}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Listar agendamentos do proprio profissional. ✅
export async function getSelfAvailability() {
  const token = cookies().get('obc-da-vinci')?.value
  if (!token) return

  const res = await fetch(
    `https://project-da-vinci.vercel.app/api/private/availability`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
