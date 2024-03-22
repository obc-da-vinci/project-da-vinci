import { z } from 'zod'

export const RegisterProfessionalSchema = z.object({
  name: z.string().min(1, 'Your name is required.'),
  email: z.string().email('The email address provided is invalid.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export const AuthenticateProfessionalSchema = z.object({
  email: z.string().email('The email address provided is invalid.'),
  password: z.string().min(1, 'Please enter a password.'),
})

export const ServiceSchema = z.object({
  professionalId: z.string().cuid(),
  serviceId: z.string().optional().default(''),
  serviceName: z.string().min(1, 'A name for the service is required.'),
  description: z
    .string()
    .min(1, 'Please provide a brief description of the service.'),
  price: z.string().min(1, 'Please specify the value of the service.'),
})

export const AvailabilitySchema = z.object({
  dayOfWeek: z.number().min(1).max(7),
  startTime: z.number().min(0).max(24),
  endTime: z.number().min(0).max(24),
})

export const AppointmentSchema = z.object({
  date: z.string().min(1, 'Please enter a date.'),
  startTime: z.number().min(0).max(24),
  endTime: z.number().min(0).max(24),
  textMessage: z.string().max(100, 'Exceeded the 100-character limit.'),
})
