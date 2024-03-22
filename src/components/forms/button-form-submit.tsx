'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

interface Props {
  title: string
  wFull?: boolean
  rounded?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export default function ButtonFormSubmit({
  title,
  wFull,
  color,
  rounded,
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      color={color}
      className={`${wFull && 'w-full'} ${rounded && 'rounded-full'}`}
    >
      {title}
    </Button>
  )
}
