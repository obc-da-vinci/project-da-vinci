// GET /availability - Obter disponibilidade do profissional.
export async function GET() {
  return Response.json({ availability: 'list' })
}
