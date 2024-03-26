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

      if (!data) {
        return Response.json(
          { error: 'Professional not found' },
          { status: 404 },
        )
      }

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
    console.error('Error fetching professionals:', e)
    return Response.json(
      { error: e instanceof Error ? e.message : 'API error' },
      { status: 500 },
    )
  }
}
