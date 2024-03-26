// Obter disponibilidade do profissional
export async function getAvailability() {
  const res = await fetch(
    'https://project-da-vinci.vercel.app/api/availability',
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Obter lista de profissionais cadastrados
export async function getProfessionals() {
  const res = await fetch(
    'https://project-da-vinci.vercel.app/api/professionals',
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// Obter lista de serviços ofertados
export async function getSolutions() {
  const res = await fetch('https://project-da-vinci.vercel.app/api/solutions')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
