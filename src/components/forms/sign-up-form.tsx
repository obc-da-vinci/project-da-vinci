'use client'

import { Input, Link } from '@nextui-org/react'
import ButtonFormSubmit from './button-form-submit'
import InputPassword from './input-password'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'

export default function SignUpForm() {
  const [formState, action] = useFormState(actions.auth.registerProfessional, {
    errors: {},
  })

  return (
    <form
      action={action}
      className="mx-auto mb-16 max-w-lg space-y-5 rounded-lg border p-4 shadow-md"
    >
      <h1 className="text-xl">Sign up for free</h1>
      <Input
        name="name"
        label="your full name"
        isInvalid={!!formState?.errors.name}
        errorMessage={formState?.errors.name}
      />
      <Input
        type="email"
        name="email"
        label="email address"
        isInvalid={!!formState?.errors.email}
        errorMessage={formState?.errors.email}
      />
      <InputPassword
        label="choose a password"
        isInvalid={!!formState?.errors.password}
        errorMessage={formState?.errors.password}
      />
      <ButtonFormSubmit title="Get Started" wFull color="primary" />
      <footer className="text-sm">
        <span>
          Already have an account?{' '}
          <Link href="/sign-in" size="sm">
            Log in
          </Link>
        </span>
      </footer>
    </form>
  )
}
