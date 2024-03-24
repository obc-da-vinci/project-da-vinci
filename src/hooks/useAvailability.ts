import { useState } from 'react'

type WeekDay = 1 | 2 | 3 | 4 | 5 | 6

type WeekDayAvailability = {
  [key in WeekDay]?: {
    startAt?: number
    endAt?: number
  }
}

export function useAvailability() {
  const [availability, setAvailability] = useState<WeekDayAvailability>({})

  const handleToggleDay = (day: WeekDay) => {
    setAvailability((prevAvailability) => {
      if (prevAvailability[day]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [day]: omit, ...updatedAvailability } = prevAvailability
        return updatedAvailability
      } else {
        return {
          ...prevAvailability,
          [day]: {},
        }
      }
    })
  }

  const handleTimeChange = ({
    day,
    startAt,
    endAt,
  }: {
    day: WeekDay
    startAt?: number
    endAt?: number
  }) => {
    setAvailability((prevAvailability) => {
      const existingAvailability = prevAvailability[day] || {}
      return {
        ...prevAvailability,
        [day]: {
          ...existingAvailability,
          startAt:
            startAt !== undefined ? startAt : existingAvailability.startAt,
          endAt: endAt !== undefined ? endAt : existingAvailability.endAt,
        },
      }
    })
  }

  return {
    availability,
    handleToggleDay,
    handleTimeChange,
  }
}
