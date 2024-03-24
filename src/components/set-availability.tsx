'use client'

import { useAvailability } from '@/hooks/useAvailability'
import { Button } from '@nextui-org/react'
import { SyntheticEvent, useState } from 'react'
import WeekdayButton from './weekday-button'

type WeekDay = 1 | 2 | 3 | 4 | 5 | 6

type WeekDayAvailability = {
  [key in WeekDay]?: {
    startAt?: number
    endAt?: number
  }
}

export default function SetAvailability({
  professionalId,
}: {
  professionalId: string
}) {
  const { availability, handleToggleDay, handleTimeChange } = useAvailability()
  const [errorMessage, setErrorMessage] = useState('')

  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (Object.entries(availability).length) {
      const hasConflict = checkForConflicts(availability)

      if (hasConflict) return

      alert('prossiga...')
    } else {
      setErrorMessage('Select a date at least one day.')
    }
  }

  const checkForConflicts = (availability: WeekDayAvailability): boolean => {
    return Object.values(availability).some((value) => {
      const startAt = value.startAt
      const endAt = value.endAt

      if (!startAt || (startAt && !endAt)) {
        setErrorMessage(
          'Please provide the required information as the form cannot be left empty.',
        )
        return true
      }

      if (startAt && endAt && startAt >= endAt) {
        setErrorMessage(
          'Double check the entry values. Start time cannot be greater than end time.',
        )
        return true
      }

      return setErrorMessage('')
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col rounded-lg border-2 p-2 shadow-md"
      >
        <span className="my-4 text-center text-neutral-600">
          Click on a day below to set your availability
        </span>
        <input type="hidden" name="professionalId" value={professionalId} />
        <WeekdayButton
          isActive={mon}
          onClick={() => setMon(!mon)}
          weekDay={1}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />
        <WeekdayButton
          isActive={tue}
          onClick={() => setTue(!tue)}
          weekDay={2}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />
        <WeekdayButton
          isActive={wed}
          onClick={() => setWed(!wed)}
          weekDay={3}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />
        <WeekdayButton
          isActive={thu}
          onClick={() => setThu(!thu)}
          weekDay={4}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />
        <WeekdayButton
          isActive={fri}
          onClick={() => setFri(!fri)}
          weekDay={5}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />
        <WeekdayButton
          isActive={sat}
          onClick={() => setSat(!sat)}
          weekDay={6}
          handleToggleDay={handleToggleDay}
          handleTimeChange={handleTimeChange}
        />
        {errorMessage && (
          <p className="mb-4 rounded-lg border border-red-400 bg-red-200 p-1.5 text-red-700 shadow">
            {errorMessage}
          </p>
        )}
        <Button type="submit" color="primary">
          Save
        </Button>
      </form>
    </div>
  )
}
