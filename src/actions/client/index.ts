'use server'

import { prisma } from '@/lib/prisma'
import { AppointmentSchema } from '@/lib/schemas'
import { AppointmentFormState } from '@/lib/states'

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

/**
 * Criar um novo agendamento (pelo cliente), incluindo o serviço desejado,
 * e-mail, telefone e uma mensagem ao profissional no payload.
 */
export async function createAppointment(
  formState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const parsed = AppointmentSchema.safeParse({
    dateSelected: formData.get('dateSelected'),
    hourSelected: formData.get('hourSelected'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    textMessage: formData.get('textMessage'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  return { errors: {} }
}
