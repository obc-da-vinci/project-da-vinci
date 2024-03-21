import { NextResponse } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: Request) {
  const auth = request.headers.get('Authorization')
  const token = auth?.slice(7)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!token) return NextResponse.error()

  const { payload } = await jose.jwtVerify(token, secret)

  if (!payload || !payload.sub) return NextResponse.error()

  return NextResponse.next()
}

export const config = {
  matcher: '/api/private/:path*',
}
