import { prisma } from '@/lib/prisma'

// GET /solutions - Obter lista de serviços ofertados.
export async function GET() {
  try {
    const data = await prisma.services.findMany({
      include: { professional: { select: { name: true } } },
      orderBy: { serviceName: 'asc' },
    })

    return Response.json(data)
  } catch (e) {
    return Response.json({ error: 'api error' })
  }
}
