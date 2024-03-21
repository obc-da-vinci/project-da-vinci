'use client'

import { changeStatusAppointments } from '@/services/professional'

interface Props {
  id: string
  status: 'ACCEPT' | 'REJECTED'
}

export default function ButtonAppointmentStatus({ id, status }: Props) {
  const handleChange = async ({ id, status }: Props) => {
    const response = await changeStatusAppointments({ id, status })
    alert(JSON.stringify(response, null, 2))
  }

  switch (status) {
    case 'ACCEPT':
      return (
        <button onClick={() => handleChange({ id, status })}>Accept</button>
      )
    case 'REJECTED':
      return (
        <button onClick={() => handleChange({ id, status })}>Rejected</button>
      )
    default:
  }
}
