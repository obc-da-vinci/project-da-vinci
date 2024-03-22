import { openSessionToken } from '@/actions'
import { prisma } from '@/lib/prisma'

// GET /services - Listar serviços do profissional.
export async function GET(request: Request) {
  const auth = request.headers.get('Authorization')
  const token = auth?.slice(7)

  if (!token) return null

  const { sub } = await openSessionToken(token)

  try {
    const data = await prisma.services.findMany({
      where: { professionalId: sub },
      orderBy: { serviceName: 'asc' },
    })

    return Response.json(data)
  } catch (e) {
    return Response.json({ message: 'Unauthorized' })
  }
}

// DELETE /services/:id - Excluir um serviço.
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return Response.json({ message: 'ID not found' })

  return Response.json({ message: `service with id: ${id} deleted` })
}
