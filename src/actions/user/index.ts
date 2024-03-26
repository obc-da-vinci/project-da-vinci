'use server'

import { prisma } from '@/lib/prisma'
import { ServiceSchema } from '@/lib/schemas'
import { AvailabilityFormState, ServiceFormState } from '@/lib/states'
import { WeekDayAvailability } from '@/lib/types'
import { clearValue } from '@/utils'
import { revalidatePath } from 'next/cache'

// Adicionar um novo serviço.
export async function upsertService(
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

  return { success: true, errors: {} }
}

// Atualizar um serviço existente.
export async function updateService(
  formState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  return { errors: {} }
}

// Atualizar disponibilidade existente.
export async function updateAvailability(
  formState: AvailabilityFormState,
  formData: FormData,
): Promise<AvailabilityFormState> {
  return { errors: {} }
}

// obter lista de agendamentos
export async function getAppointments(professionalId: string) {
  return prisma.appointments.findMany({
    where: { professionalId },
  })
}

// obter disponibilidade
export async function getAvailability(professionalId: string) {
  return prisma.availability.findMany({
    where: { professionalId },
  })
}

// criar disponibilidade
export async function createAvailability(
  availability: WeekDayAvailability,
  professionalId: string,
) {
  await Promise.all(
    Object.entries(availability).map(async ([key, value]) => {
      const dayOfWeek = Number(key)
      const startTime = value.startAt ?? 0
      const endTime = value.endAt ?? 0

      const existingAvailability = await prisma.availability.findFirst({
        where: { professionalId, dayOfWeek },
      })

      if (existingAvailability) {
        await prisma.availability.update({
          where: { id: existingAvailability.id },
          data: {
            dayOfWeek,
            startTime,
            endTime,
            professionalId,
          },
        })
      } else {
        await prisma.availability.create({
          data: {
            dayOfWeek,
            startTime,
            endTime,
            professionalId,
          },
        })
      }
    }),
  )

  revalidatePath('/availability')
}

// obter lista de serviços
export async function getServices(professionalId: string) {
  return prisma.services.findMany({
    where: { professionalId },
  })
}

// excluir um serviço
// alterar status do agendamento
