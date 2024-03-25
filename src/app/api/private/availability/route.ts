import { NextResponse } from 'next/server'
import * as jose from 'jose'
import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

// GET /availability - Listar disponibilidade do proprio profissional.
export async function GET(request: Request) {
  const auth = request.headers.get('Authorization')
  const token = auth?.slice(7)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!token) return NextResponse.error()

  const { payload } = await jose.jwtVerify(token, secret)

  if (!payload || !payload.sub) return NextResponse.error()

  const availability = await prisma.availability.findMany({
    where: { professionalId: payload.sub },
    orderBy: { dayOfWeek: 'asc' },
  })

  return Response.json({ availability })
}

// POST /availability - Criar disponibilidade do profissional
export async function POST(request: Request) {
  const auth = request.headers.get('Authorization')
  const token = auth?.slice(7)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!token) return NextResponse.error()

  const { payload } = await jose.jwtVerify(token, secret)

  if (!payload || !payload.sub) return NextResponse.error()

  // capturar os dados, verificar se ja tem lançamento pra esse dia
  const professionalId = payload.sub
  const requestBody: { startAt: number; endAt: number }[] = await request.json()

  await Promise.all(
    Object.entries(requestBody).map(async ([key, value]) => {
      const dayOfWeek = Number(key)
      const startTime = value.startAt
      const endTime = value.endAt

      const existingAvailability = await prisma.availability.findFirst({
        where: { professionalId, dayOfWeek },
      })

      if (existingAvailability) {
        await prisma.availability.update({
          where: { id: existingAvailability.id },
          data: {
            dayOfWeek,
            startTime,
            endTime,
            professionalId,
          },
        })
      } else {
        await prisma.availability.create({
          data: {
            dayOfWeek,
            startTime,
            endTime,
            professionalId,
          },
        })
      }
    }),
  )

  revalidateTag('availability')
  return NextResponse.json({})
}
