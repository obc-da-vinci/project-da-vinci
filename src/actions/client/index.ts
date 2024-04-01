'use server'

import { prisma } from '@/lib/prisma'
import { AppointmentSchema } from '@/lib/schemas'
import { AppointmentFormState } from '@/lib/states'
import { sendMail } from '@/service/sendMail'
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
    include: { professional: { select: { name: true } } },
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

  const dateSelected = parsed.data.dateSelected
  const timestamp = parseInt(dateSelected)
  const date = isNaN(timestamp) ? new Date(dateSelected) : new Date(timestamp)

  const mailOptions = {
    from: {
      name: 'Platform Vinci Sphere',
      address: process.env.EMAIL_USER!,
    },
    to: parsed.data.email,
    subject: 'Appointment completed successfully ✅',
    text: `We have received your request to schedule the service ${parsed.data.service} on the day ${date.toLocaleDateString('en-US', { dateStyle: 'long' })} and time ${parsed.data.hourSelected}, you will receive an email when the professional accepts the request.`,
  }

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
      }),
      sendMail(mailOptions),
    ])
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: { _form: 'Unable to complete the appointment.' + e.message },
      }
    }
  }

  redirect(parsed.data.redirect)
}
