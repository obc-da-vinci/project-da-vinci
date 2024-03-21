// Obter disponibilidade do profissional
export async function getAvailability() {
  const response = await fetch(
    'https://project-da-vinci.vercel.app/api/availability',
  )

  return response.json()
}

// Obter lista de profissionais cadastrados
export async function getProfessionals() {
  const response = await fetch(
    'https://project-da-vinci.vercel.app/api/professionals',
  )

  return response.json()
}

// Obter lista de serviços ofertados
export async function getSolutions() {
  const response = await fetch(
    'https://project-da-vinci.vercel.app/api/solutions',
  )

  return response.json()
}
