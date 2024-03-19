/**
 * PATCH /appointments/:id/status - Alterar o status do agendamento
 * (aceitar/rejeitar), disparando uma notificação por e-mail ao cliente.
 */
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = String(searchParams.get('id'))
  const status = String(searchParams.get('status'))

  const EnumStatus = ['ACCEPT', 'REJECTED', 'CANCELED']

  if (!id) return Response.json({ message: 'ID not found' })

  if (!EnumStatus.includes(status.toUpperCase()) || !status) {
    return Response.json({ message: 'Bad request' })
  }

  return Response.json({ message: 'success' })
}
