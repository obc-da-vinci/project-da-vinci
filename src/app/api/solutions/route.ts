// GET /solutions - Obter lista de serviços ofertados.
export async function GET() {
  return Response.json({ solutions: 'list' })
}
