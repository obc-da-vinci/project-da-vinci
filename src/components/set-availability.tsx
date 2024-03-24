'use client'

import { Hours, WeekDays } from '@/utils'
import { Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import ButtonFormSubmit from './forms/button-form-submit'
import { useFormState } from 'react-dom'
import * as actions from '@/actions'

type WeekDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

interface WeekDayButtonProps {
  weekDay: WeekDays
  isActive: boolean
  onClick: () => void
}

export default function SetAvailability({
  professionalId,
}: {
  professionalId: string
}) {
  const [formState, action] = useFormState(actions.createAvailability, {
    errors: {},
  })

  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)

  const WeekDayButton = ({
    weekDay,
    isActive,
    onClick,
  }: WeekDayButtonProps) => (
    <div className="mb-2 flex items-center">
      <button
        type="button"
        onClick={onClick}
        className={`flex-1 self-stretch rounded-lg border font-medium ${isActive ? 'bg-blue-500 text-white' : 'text-neutral-500'}`}
      >
        {weekDay[0].toUpperCase().concat(weekDay.slice(1))}
      </button>
      <Select
        name={`${weekDay}StartAt`}
        className="mx-2 flex-1"
        label="start at"
        variant="bordered"
        isDisabled={!isActive}
      >
        {Hours.map((hour) => (
          <SelectItem key={hour.value} value={hour.value}>
            {hour.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        name={`${weekDay}EndAt`}
        className="flex-1"
        label="end at"
        variant="bordered"
        isDisabled={!isActive}
      >
        {Hours.map((hour) => (
          <SelectItem key={hour.value} value={hour.value}>
            {hour.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )

  return (
    <div className="flex items-center justify-center">
      <form
        action={action}
        className="flex w-full max-w-lg flex-col rounded-lg border-2 p-2 shadow-md"
        style={{ gridTemplateColumns: '1fr 2fr' }}
      >
        <span className="my-4 text-center text-neutral-600">
          Click on a day below to set your availability
        </span>
        <input type="hidden" name="professionalId" value={professionalId} />
        <WeekDayButton
          weekDay="mon"
          isActive={mon}
          onClick={() => setMon(!mon)}
        />
        <WeekDayButton
          weekDay="tue"
          isActive={tue}
          onClick={() => setTue(!tue)}
        />
        <WeekDayButton
          weekDay="wed"
          isActive={wed}
          onClick={() => setWed(!wed)}
        />
        <WeekDayButton
          weekDay="thu"
          isActive={thu}
          onClick={() => setThu(!thu)}
        />
        <WeekDayButton
          weekDay="fri"
          isActive={fri}
          onClick={() => setFri(!fri)}
        />
        <WeekDayButton
          weekDay="sat"
          isActive={sat}
          onClick={() => setSat(!sat)}
        />
        {formState?.errors._form && (
          <p className="rounded-lg border border-red-400 bg-red-200 p-1.5 text-sm text-red-700">
            {formState.errors._form}
          </p>
        )}
        <div className="my-4">
          <ButtonFormSubmit title="Save" wFull color="primary" />
        </div>
      </form>
    </div>
  )
}
