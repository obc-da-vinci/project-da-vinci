'use client'

import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react'
import { Availability } from '@prisma/client'
import { Hours } from '@/utils'
import Link from 'next/link'
import { BsClock } from 'react-icons/bs'

export default function TableAvailability({
  availability,
}: {
  availability: Availability[]
}) {
  const startAtArray: string[] = []
  const endAtArray: string[] = []

  for (let i = 1; i <= 6; i++) {
    startAtArray.push('-')
    endAtArray.push('-')
  }

  availability.forEach((available) => {
    const startLabel =
      Hours.find((hour) => hour.value === available.startTime)?.label || '-'
    const endLabel =
      Hours.find((hour) => hour.value === available.endTime)?.label || '-'
    startAtArray[available.dayOfWeek - 1] = startLabel
    endAtArray[available.dayOfWeek - 1] = endLabel
  })

  console.log('aqui.. ', startAtArray, endAtArray)

  return (
    <>
      <div className="mx-auto max-w-lg">
        <Link href="/availability/set-schedule">
          <Button
            variant="bordered"
            className="my-5 w-full font-medium hover:border-blue-500 hover:text-blue-500"
          >
            <BsClock color="white" size={18} /> Click here to set your
            availability
          </Button>
        </Link>
      </div>
      <Table
        aria-label="Availability table"
        className="mx-auto max-w-lg rounded-xl border"
      >
        <TableHeader>
          <TableColumn className="text-center">MON</TableColumn>
          <TableColumn className="text-center">TUE</TableColumn>
          <TableColumn className="text-center">WED</TableColumn>
          <TableColumn className="text-center">THU</TableColumn>
          <TableColumn className="text-center">FRI</TableColumn>
          <TableColumn className="text-center">SAT</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            {startAtArray.map((start, index) => (
              <TableCell key={index} className="text-center font-medium">
                {start}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {endAtArray.map((end, index) => (
              <TableCell key={index} className="text-center font-medium">
                {end}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
