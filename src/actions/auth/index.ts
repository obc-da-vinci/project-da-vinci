'use server'

import { prisma } from '@/lib/prisma'
import {
  AuthenticateProfessionalSchema,
  RegisterProfessionalSchema,
} from '@/lib/schemas'
import { ProfessionalFormState } from '@/lib/states'
import { capitalizeString } from '@/utils'
import { Professional } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Registrar novo profissional.
export async function registerProfessional(
  formState: ProfessionalFormState,
  formData: FormData,
): Promise<ProfessionalFormState> {
  const parsed = RegisterProfessionalSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const nameCaptalized = capitalizeString(parsed.data.name)
  const passwordHash = await bcrypt.hash(parsed.data.password, 10)

  try {
    const user = await prisma.professional.create({
      data: {
        name: nameCaptalized,
        email: parsed.data.email,
        password: passwordHash,
      },
    })

    await CreateSessionToken(user)
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        errors: { email: ['This email address has already been registered.'] },
      }
    } else {
      return { errors: { _form: 'An error ocurred' } }
    }
  }

  redirect('/dashboard')
}

// Autenticar profissional.
export async function authenticateProfessional(
  formState: ProfessionalFormState,
  formData: FormData,
): Promise<ProfessionalFormState> {
  const parsed = AuthenticateProfessionalSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await prisma.professional.findUnique({
      where: { email: parsed.data.email },
    })

    if (!user) {
      return {
        errors: { email: ['Email not found. Please check and resubmit.'] },
      }
    }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      user.password,
    )

    if (!passwordMatch) {
      return {
        errors: { password: [`Password doesn't match.`] },
      }
    }

    await CreateSessionToken(user)
  } catch (e) {
    return { errors: { _form: 'Could not connect to the server.' } }
  }

  redirect('/dashboard')
}

async function CreateSessionToken({ id, name, email }: Professional) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const payload = { sub: id, name, email }
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('7d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set('obc-da-vinci', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  })
}

export async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

export async function endSession() {
  console.log('finalizando a sessao')
  return cookies().delete('obc-da-vinci')
}
