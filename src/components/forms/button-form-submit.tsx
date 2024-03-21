'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

interface Props {
  title: string
  wFull?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export default function ButtonFormSubmit({ title, wFull, color }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      color={color}
      className={`${wFull && 'w-full'} rounded-full`}
    >
      {title}
    </Button>
  )
}
