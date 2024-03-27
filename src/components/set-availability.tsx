'use client'

import WeekdayButton from './weekday-button'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import ButtonFormSubmit from './forms/button-form-submit'
import { Availability } from '@prisma/client'

// TODO: Puxar as informações do banco

export default function SetAvailability({
  professionalId,
  availability,
}: {
  professionalId: string
  availability: Availability[]
}) {
  const [formState, action] = useFormState(actions.user.createAvailability, {
    errors: {},
  })

  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)

  const monActive = availability.filter((day) => day.dayOfWeek === 1)
  const tueActive = availability.filter((day) => day.dayOfWeek === 2)
  const wedActive = availability.filter((day) => day.dayOfWeek === 3)
  const thuActive = availability.filter((day) => day.dayOfWeek === 4)
  const friActive = availability.filter((day) => day.dayOfWeek === 5)
  const satActive = availability.filter((day) => day.dayOfWeek === 6)

  useEffect(() => {
    monActive.length > 0 && setMon(true)
    tueActive.length > 0 && setTue(true)
    wedActive.length > 0 && setWed(true)
    thuActive.length > 0 && setThu(true)
    friActive.length > 0 && setFri(true)
    satActive.length > 0 && setSat(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={action}
        className="flex w-full max-w-lg flex-col rounded-lg border-2 p-2 shadow-md"
      >
        <span className="my-4 text-center text-neutral-600">
          Click on a day below to set your availability
        </span>
        <input type="hidden" name="professionalId" value={professionalId} />
        <WeekdayButton
          isActive={mon}
          onClick={() => setMon(!mon)}
          weekDay={'mon'}
          startTime={monActive[0]?.startTime}
          endTime={monActive[0]?.endTime}
        />
        <WeekdayButton
          isActive={tue}
          onClick={() => setTue(!tue)}
          weekDay={'tue'}
          startTime={tueActive[0]?.startTime}
          endTime={tueActive[0]?.endTime}
        />
        <WeekdayButton
          isActive={wed}
          onClick={() => setWed(!wed)}
          weekDay={'wed'}
          startTime={wedActive[0]?.startTime}
          endTime={wedActive[0]?.endTime}
        />
        <WeekdayButton
          isActive={thu}
          onClick={() => setThu(!thu)}
          weekDay={'thu'}
          startTime={thuActive[0]?.startTime}
          endTime={thuActive[0]?.endTime}
        />
        <WeekdayButton
          isActive={fri}
          onClick={() => setFri(!fri)}
          weekDay={'fri'}
          startTime={friActive[0]?.startTime}
          endTime={friActive[0]?.endTime}
        />
        <WeekdayButton
          isActive={sat}
          onClick={() => setSat(!sat)}
          weekDay={'sat'}
          startTime={satActive[0]?.startTime}
          endTime={satActive[0]?.endTime}
        />
        {formState?.errors._form && (
          <p className="mb-4 rounded-lg border border-red-400 bg-red-200 p-1.5 text-red-700 shadow">
            {formState.errors._form}
          </p>
        )}
        <ButtonFormSubmit title="Save" color="primary" />
      </form>
    </div>
  )
}
