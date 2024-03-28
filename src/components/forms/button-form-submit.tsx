'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

interface Props {
  title: string
  wFull?: boolean
  rounded?: boolean
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function ButtonFormSubmit({
  title,
  wFull,
  color,
  rounded,
  size,
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      color={color}
      size={size}
      className={`${wFull && 'w-full'} ${rounded && 'rounded-full'}`}
    >
      {title}
    </Button>
  )
}
