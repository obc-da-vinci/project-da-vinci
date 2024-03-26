'use client'

import { Input, Link } from '@nextui-org/react'
import ButtonFormSubmit from './button-form-submit'
import InputPassword from './input-password'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'

export default function SignInForm() {
  const [formState, action] = useFormState(
    actions.auth.authenticateProfessional,
    {
      errors: {},
    },
  )

  return (
    <form
      action={action}
      className="mx-auto mb-16 max-w-lg space-y-5 rounded-lg border p-4 shadow-md"
    >
      <h1 className="text-xl">
        Welcome to{' '}
        <span className="font-medium text-blue-500">Vinci Sphere</span>
      </h1>
      <Input
        type="email"
        name="email"
        label="e-mail address"
        isInvalid={!!formState?.errors.email}
        errorMessage={formState?.errors.email}
      />
      <InputPassword
        label="password"
        isInvalid={!!formState?.errors.password}
        errorMessage={formState?.errors.password}
      />
      <ButtonFormSubmit title="Login" wFull color="primary" />
      <footer className="text-sm">
        <span>
          Don't have an account?{' '}
          <Link href="/sign-up" size="sm">
            Sign Up
          </Link>
        </span>
      </footer>
    </form>
  )
}
