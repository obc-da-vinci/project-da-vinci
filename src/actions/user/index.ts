'use server'

import { prisma } from '@/lib/prisma'
import { ServiceSchema } from '@/lib/schemas'
import { AvailabilityFormState, ServiceFormState } from '@/lib/states'
import { clearValue, extractData, isValidFormData } from '@/utils'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
    if (e instanceof Error) {
      return { errors: { _form: e.message } }
    }
  }

  revalidatePath('/services')
  redirect('/services')
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
  formState: AvailabilityFormState,
  formData: FormData,
): Promise<AvailabilityFormState> {
  const professionalId = String(formData.get('professionalId'))

  if (!professionalId) return { errors: { _form: 'Unauthorized' } }

  const data = extractData(formData)

  const { isValid, message } = isValidFormData(data)

  if (!isValid) {
    return { errors: { _form: message } }
  }

  const filteredDate = data.filter((day) => {
    const { startTime, endTime } = Object.values(day)[0]
    return startTime && endTime
  })

  const promises = []

  promises.push(
    prisma.availability.deleteMany({
      where: { professionalId },
    }),
  )

  for (const item of filteredDate) {
    const dayOfWeek = parseInt(Object.keys(item)[0])
    const schedules = item[dayOfWeek]

    promises.push(
      prisma.availability.create({
        data: {
          dayOfWeek,
          startTime: schedules.startTime,
          endTime: schedules.endTime,
          professionalId,
        },
      }),
    )
  }

  await Promise.all(promises)

  revalidatePath('/availability')
  redirect('/availability')
}

// obter lista de serviços
export async function getServices(professionalId: string) {
  return prisma.services.findMany({
    where: { professionalId },
  })
}

// excluir um serviço
// alterar status do agendamento
