// GET /appointments - Listar agendamentos do profissional.
export async function GET() {
  return Response.json({ appointments: 'list' })
}
