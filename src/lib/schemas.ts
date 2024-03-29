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
  professionalId: z.string().cuid(),
  monStartAt: z.number().optional().nullable(),
  monEndAt: z.number().optional().nullable(),
  tueStartAt: z.number().optional().nullable(),
  tueEndAt: z.number().optional().nullable(),
  wedStartAt: z.number().optional().nullable(),
  wedEndAt: z.number().optional().nullable(),
  thuStartAt: z.number().optional().nullable(),
  thuEndAt: z.number().optional().nullable(),
  friStartAt: z.number().optional().nullable(),
  friEndAt: z.number().optional().nullable(),
  satStartAt: z.number().optional().nullable(),
  satEndAt: z.number().optional().nullable(),
})

export const AppointmentSchema = z.object({
  professionalId: z.string().cuid(),
  service: z.string().min(1, 'Please selected a service available.').cuid(),
  dateSelected: z.string().min(1, 'Please selected a date available.'),
  hourSelected: z.string().min(1, 'Please selected a time available.'),
  name: z.string().min(1, 'Your name is required.'),
  email: z.string().email('The email address provided is invalid.'),
  phone: z.string().min(1, 'Your telephone number is required.'),
  textMessage: z
    .string()
    .max(100, 'Exceeded the 100-character limit.')
    .optional(),
  redirect: z.string().optional().default('/'),
})
