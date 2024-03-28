'use server'

import { prisma } from '@/lib/prisma'
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
    include: { professional: { select: { name: true } } },
    orderBy: { dayOfWeek: 'asc' },
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
  return { errors: {} }
}
