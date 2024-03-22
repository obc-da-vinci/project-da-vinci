export const WeekDays = [
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
  { value: 6, label: 'Sábado' },
]

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

export const CapitalizeString = (value: string) => {
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
