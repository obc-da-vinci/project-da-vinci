import { prisma } from '@/lib/prisma'

// GET /professionals - Obter lista de profissionais.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (id) {
      const data = await prisma.professional.findUnique({
        where: { id },
      })

      if (!data) return Response.json({ professional: 'not found' })

      const professional = {
        id: data.id,
        name: data.name,
        email: data.email,
      }

      return Response.json({ professional })
    } else {
      const data = await prisma.professional.findMany({
        orderBy: { name: 'asc' },
      })

      const professionals = data.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
      }))

      return Response.json({ professionals })
    }
  } catch (e) {
    return Response.json({ error: 'api error' })
  }
}
