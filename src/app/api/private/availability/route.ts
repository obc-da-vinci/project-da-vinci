import { NextResponse } from 'next/server'
import * as jose from 'jose'

// GET /availability - Listar disponibilidade do proprio profissional.
export async function GET(request: Request) {
  const auth = request.headers.get('Authorization')
  const token = auth?.slice(7)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!token) return NextResponse.error()

  const { payload } = await jose.jwtVerify(token, secret)

  if (!payload || !payload.sub) return NextResponse.error()

  return Response.json({
    availability: `show availability of professional: ${payload.sub}`,
  })
}
