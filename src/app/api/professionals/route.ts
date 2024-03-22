import { prisma } from '@/lib/prisma'

// GET /professionals - Obter lista de profissionais.
export async function GET() {
  try {
    const data = await prisma.professional.findMany({
      orderBy: { name: 'asc' },
    })

    const professionals = data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
    }))

    return Response.json(professionals)
  } catch (e) {
    return Response.json({ error: 'api error' })
  }
}
