export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6

export type WeekDayAvailability = {
  [key in WeekDay]?: {
    startAt?: number
    endAt?: number
  }
}

export const Hours = [
  { value: 8, label: '08:00' },
  { value: 8.5, label: '08:30' },
  { value: 9, label: '09:00' },
  { value: 9.5, label: '09:30' },
  { value: 10, label: '10:00' },
  { value: 10.5, label: '10:30' },
  { value: 11, label: '11:00' },
  { value: 11.5, label: '11:30' },
  { value: 12, label: '12:00' },
  { value: 12.5, label: '12:30' },
  { value: 13, label: '13:00' },
  { value: 13.5, label: '13:30' },
  { value: 14, label: '14:00' },
  { value: 14.5, label: '14:30' },
  { value: 15, label: '15:00' },
  { value: 15.5, label: '15:30' },
  { value: 16, label: '16:00' },
  { value: 16.5, label: '16:30' },
  { value: 17, label: '17:00' },
  { value: 17.5, label: '17:30' },
  { value: 18, label: '18:00' },
]

export interface Schedule {
  startTime: number | null
  endTime: number | null
}

export interface FilteredDateItem {
  [key: number]: Schedule
}

export interface ProfessionalWithAvailability {
  Availability: {
    id: string
    professionalId: string
    dayOfWeek: number
    startTime: number
    endTime: number
  }[]
  id: string
  name: string
  email: string
  password: string
}

export interface SolutionsWithProfessionalName {
  professional: {
    name: string
  }
  id: string
  professionalId: string
  serviceName: string
  description: string
  price: number
}
