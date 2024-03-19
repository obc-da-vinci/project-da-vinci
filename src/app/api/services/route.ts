// GET /services - Listar serviços do profissional.
export async function GET() {
  return Response.json({ serices: 'list' })
}

// DELETE /services/:id - Excluir um serviço.
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  console.log('aqui: ', id)
  if (!id) return Response.json({ message: 'ID not found' })

  return Response.json({ message: `service with id: ${id} deleted` })
}
