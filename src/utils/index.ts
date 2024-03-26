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
