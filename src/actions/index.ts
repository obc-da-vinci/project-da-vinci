'use server'

import {
  AppointmentFormState,
  AvailabilityFormState,
  ProfessionalFormState,
  ServiceFormState,
} from '@/lib/states'

// Registrar novo profissional.
export async function registerProfessional(
  formState: ProfessionalFormState,
  formData: FormData,
): Promise<ProfessionalFormState> {
  return { errors: {} }
}

// Autenticar profissional.
export async function authenticateProfessional(
  formState: ProfessionalFormState,
  formData: FormData,
): Promise<ProfessionalFormState> {
  return { errors: {} }
}

// Adicionar um novo serviço.
export async function createService(
  formState: ServiceFormState,
  formData: FormData,
): Promise<ServiceFormState> {
  return { errors: {} }
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
