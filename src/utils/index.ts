type TimeSlot = {
  startTime: number
  endTime: number
}

type Data = Array<{
  1?: TimeSlot
  2?: TimeSlot
  3?: TimeSlot
  4?: TimeSlot
  5?: TimeSlot
  6?: TimeSlot
}>

export const capitalizeString = (value: string) => {
  const words = value.split(' ')
  const capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  return capitalizeWords.join(' ')
}

export const clearValue = (value: string) => {
  const clearedValue = parseFloat(value.replace('$ ', '').replace(',', ''))
  return clearedValue
}

export const extractData = (
  formData: FormData,
): { [key: number]: TimeSlot }[] => {
  return [
    {
      1: {
        startTime: Number(formData.get('monStartAt')) || 0,
        endTime: Number(formData.get('monEndAt')) || 0,
      },
    },
    {
      2: {
        startTime: Number(formData.get('tueStartAt')) || 0,
        endTime: Number(formData.get('tueEndAt')) || 0,
      },
    },
    {
      3: {
        startTime: Number(formData.get('wedStartAt')) || 0,
        endTime: Number(formData.get('wedEndAt')) || 0,
      },
    },
    {
      4: {
        startTime: Number(formData.get('thuStartAt')) || 0,
        endTime: Number(formData.get('thuEndAt')) || 0,
      },
    },
    {
      5: {
        startTime: Number(formData.get('friStartAt')) || 0,
        endTime: Number(formData.get('friEndAt')) || 0,
      },
    },
    {
      6: {
        startTime: Number(formData.get('satStartAt')) || 0,
        endTime: Number(formData.get('satEndAt')) || 0,
      },
    },
  ]
}

export const isValidFormData = (data: Data) => {
  const isFormEmpty = data.every((day) => {
    const { startTime, endTime } = Object.values(day)[0]
    return !startTime || !endTime
  })

  if (isFormEmpty) {
    return {
      isValid: false,
      message:
        'Please provide the required information as the form cannot be left empty.',
    }
  }

  const hasConflict = data.some((day) => {
    const { startTime, endTime } = Object.values(day)[0]
    if (!startTime && !endTime) return false
    return startTime >= endTime
  })

  if (hasConflict) {
    return {
      isValid: false,
      message:
        'Double check the entry values. Start time cannot be greater than end time.',
    }
  }

  return { isValid: true, message: '' }
}
