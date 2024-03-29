'use server'

import { prisma } from '@/lib/prisma'
import { AppointmentSchema } from '@/lib/schemas'
import { AppointmentFormState } from '@/lib/states'
import { parseDate } from '@/utils'
import { redirect } from 'next/navigation'

export async function getProfessionals() {
  return prisma.professional.findMany({
    include: { Availability: true },
    orderBy: { name: 'asc' },
  })
}

// obter lista de serviços cadastrados
export async function getServices() {
  return prisma.services.findMany({
    orderBy: { serviceName: 'asc' },
  })
}

// obter a disponibilidade do profissional
export async function getProfessionalAvailability(professionalId: string) {
  return prisma.availability.findMany({
    where: { professionalId },
  })
}

// obter a lista de serviços do profissional
export async function getProfessionalServices(professionalId: string) {
  return prisma.services.findMany({
    where: { professionalId },
  })
}

/**
 * Criar um novo agendamento (pelo cliente), incluindo o serviço desejado,
 * e-mail, telefone e uma mensagem ao profissional no payload.
 */
export async function createAppointment(
  formState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const parsed = AppointmentSchema.safeParse({
    professionalId: formData.get('professionalId'),
    service: formData.get('service'),
    dateSelected: formData.get('dateSelected'),
    hourSelected: formData.get('hourSelected'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    textMessage: formData.get('textMessage'),
    redirect: formData.get('redirect'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const date = parseDate(parsed.data.dateSelected)

  try {
    await Promise.all([
      prisma.appointments.create({
        data: {
          professionalId: parsed.data.professionalId,
          clientName: parsed.data.name,
          clientEmail: parsed.data.email,
          clientPhoneNumber: parsed.data.phone,
          date,
          startTime: parseFloat(parsed.data.hourSelected),
          // TODO: atribuir duração da sessão para somar ao horário inicial
          endTime: parseFloat(parsed.data.hourSelected) + 1,
          textMessage: parsed.data.textMessage,
          servicesId: parsed.data.service,
        },

        /**
         * TODO: enviar e-mail para o client: Voce agendou um horario
         * com o fulano de tal, no dia tal, aguarde a confirmação.
         */
      }),
    ])
  } catch (e) {
    if (e instanceof Error) {
      return { errors: { _form: 'Unable to complete the appointment.' } }
    }
  }

  redirect(parsed.data.redirect)
}
