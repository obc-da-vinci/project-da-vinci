// Obter disponibilidade do profissional
export async function getAvailability() {
  const response = await fetch('http://localhost:3000/api/availability')

  return response.json()
}

// Obter lista de profissionais cadastrados
export async function getProfessionals() {
  const response = await fetch('http://localhost:3000/api/professionals')

  return response.json()
}

// Obter lista de serviços ofertados
export async function getSolutions() {
  const response = await fetch('http://localhost:3000/api/solutions')

  return response.json()
}
