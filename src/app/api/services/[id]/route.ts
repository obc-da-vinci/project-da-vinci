// DELETE /services/:id - Excluir um serviço.
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return Response.json({ message: 'ID not found' })

  return Response.json({ message: 'service deleted' })
}
