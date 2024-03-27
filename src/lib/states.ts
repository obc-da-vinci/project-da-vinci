export interface ProfessionalFormState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface ServiceFormState {
  errors: {
    serviceName?: string[]
    description?: string[]
    price?: string[]
    _form?: string
  }
}

export interface AvailabilityFormState {
  errors: {
    dayOfWeek?: string[]
    startTime?: string[]
    endTime?: string[]
    _form?: string
  }
}

export interface AppointmentFormState {
  errors: {
    textMessage?: string[]
    _form?: string
  }
}
