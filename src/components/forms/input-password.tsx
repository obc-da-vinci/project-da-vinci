'use client'

import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface Props {
  label: string
  isInvalid?: boolean
  errorMessage?: string[]
}

export default function InputPassword({
  label,
  isInvalid,
  errorMessage,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const EyeIcon = () => (
    <FaEye className="pointer-events-none text-2xl text-default-400" />
  )
  const EyeSlashIcon = () => (
    <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
  )

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      name="password"
      label={label}
      endContent={
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? EyeIcon() : EyeSlashIcon()}
        </button>
      }
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    />
  )
}
