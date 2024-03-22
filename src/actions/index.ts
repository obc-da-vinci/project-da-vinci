'use server'

import { prisma } from '@/lib/prisma'
import {
  AuthenticateProfessionalSchema,
  AvailabilitySchema,
  RegisterProfessionalSchema,
  ServiceSchema,
} from '@/lib/schemas'
import {
  AppointmentFormState,
  AvailabilityFormState,
  ProfessionalFormState,
  ServiceFormState,
} from '@/lib/states'
import { CapitalizeString, clearValue } from '@/utils'
import { Professional } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as jose from 'jose'
import { revalidateTag } from 'next/cache'
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

  const nameCaptalized = CapitalizeString(parsed.data.name)
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

  revalidateTag('professionals')
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

    const passwordMatch = bcrypt.compare(user.password, parsed.data.password)

    if (!passwordMatch) {
      return {
        errors: { email: [`Password doesn't match.`] },
      }
    }

    await CreateSessionToken(user)
  } catch (e) {
    return { errors: { _form: 'Could not connect to the server.' } }
  }

  redirect('/dashboard')
}

// Adicionar um novo serviço.
export async function createService(
  formState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  const parsed = ServiceSchema.safeParse({
    professionalId: formData.get('professionalId'),
    serviceId: formData.get('serviceId'),
    serviceName: formData.get('serviceName'),
    description: formData.get('description'),
    price: formData.get('price'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const price = clearValue(parsed.data.price)

  try {
    await prisma.services.upsert({
      where: { id: parsed.data.serviceId },
      create: {
        professionalId: parsed.data.professionalId,
        serviceName: parsed.data.serviceName,
        description: parsed.data.description,
        price,
      },
      update: {
        serviceName: parsed.data.serviceName,
        description: parsed.data.description,
        price,
      },
    })
  } catch (e) {
    if (e) {
      return { errors: { _form: 'An error ocurred.' } }
    }
  }

  revalidateTag('services')
  return { success: true, errors: {} }
}

// Atualizar um serviço existente.
export async function updateService(
  formState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  return { errors: {} }
}

// Definir nova disponibilidade.
export async function createAvailability(
  formState: AvailabilityFormState,
  formData: FormData,
): Promise<AvailabilityFormState> {
  const parsed = AvailabilitySchema.safeParse({
    startAt: {
      1: formData.get('monStartAt'),
      2: formData.get('tueStartAt'),
      3: formData.get('wedStartAt'),
      4: formData.get('thuStartAt'),
      5: formData.get('friStartAt'),
      6: formData.get('satStartAt'),
    },
    endAt: {
      1: formData.get('monEndAt'),
      2: formData.get('tueEndAt'),
      3: formData.get('wedEndAt'),
      4: formData.get('thuEndAt'),
      5: formData.get('friEndAt'),
      6: formData.get('satEndAt'),
    },
  })

  if (!parsed.success) {
    return { errors: { _form: '' } }
  }

  return { errors: {} }
}

// Atualizar disponibilidade existente.
export async function updateAvailability(
  formState: AvailabilityFormState,
  formData: FormData,
): Promise<AvailabilityFormState> {
  return { errors: {} }
}

/**
 * Criar um novo agendamento (pelo cliente), incluindo o serviço desejado,
 * e-mail, telefone e uma mensagem ao profissional no payload.
 */
export async function createAppointment(
  formState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  return { errors: {} }
}

/**
 *
 *  AUTHENTICATION SERVICES
 *
 */

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
  return cookies().delete('obc-da-vinci')
}
