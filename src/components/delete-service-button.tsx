'use client'

import { deleteServices } from '@/services/professional'

export default function ButtonDeleteService() {
  const handleDelete = async (id: string) => {
    const response = await deleteServices(id)
    alert(JSON.stringify(response, null, 2))
  }

  return (
    <button onClick={() => handleDelete('teste123')}>Delete service</button>
  )
}
