import { z } from 'zod'

export const RegisterProfessionalSchema = z.object({
  name: z.string().email('É necessário fornecer seu nome.'),
  email: z.string().email('O endereço de e-mail é inválido.'),
  password: z.string().min(1, 'Por favor, informe uma senha.'),
})

export const AuthenticateProfessionalSchema = z.object({
  email: z.string().email('O endereço de e-mail é inválido.'),
  password: z.string().min(1, 'Por favor, informe uma senha.'),
})

export const ServiceSchema = z.object({
  serviceName: z.string().min(1, 'É necessário atribuir um nome ao serviço.'),
  description: z
    .string()
    .min(1, 'Por favor, informe uma breve descrição do serviço.'),
  price: z.string().min(1, 'Por favor, informe o valor do serviço.'),
})

export const AvailabilitySchema = z.object({
  dayOfWeek: z.number().min(1).max(7),
  startTime: z.number().min(0).max(24),
  endTime: z.number().min(0).max(24),
})

export const AppointmentSchema = z.object({
  date: z.string().min(1, 'Por favor, informe uma data.'),
  startTime: z.number().min(0).max(24),
  endTime: z.number().min(0).max(24),
  textMessage: z.string().max(100, 'Ultrapassou o limite de 100 caracteres.'),
})
