'use client'

import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import ButtonFormSubmit from './button-form-submit'
import { ReactNode } from 'react'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import { Hours } from '@/lib/types'
import { Services } from '@prisma/client'

interface Props {
  professionalId: string
  professionalServices: Services[]
  dateOptions: Date[]
  redirect: string
}

export default function AppointmentForm({
  professionalId,
  professionalServices,
  dateOptions,
  redirect,
}: Props) {
  const [formState, action] = useFormState(actions.client.createAppointment, {
    errors: {},
  })

  const Title = ({ title }: { title: string }) => (
    <h1 className="mx-auto border-b text-center font-light text-neutral-500 md:text-xl">
      {title}
    </h1>
  )

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
      {children}
    </div>
  )

  const formatDate = (date: Date) => {
    const options = { day: 'numeric', month: 'long', weekday: 'long' } as const
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <form
      action={action}
      className="container mx-auto space-y-3 rounded-xl border p-5 shadow"
    >
      <input type="hidden" name="redirect" value={redirect} />
      <input type="hidden" name="professionalId" value={professionalId} />
      <Title title="Request appointment" />
      <Wrapper>
        <Select
          name="dateSelected"
          label="What day are you looking for?"
          variant="bordered"
          isInvalid={!!formState?.errors.dateSelected}
          errorMessage={formState?.errors.dateSelected}
        >
          {dateOptions.map((date) => (
            <SelectItem key={date.getTime()}>{formatDate(date)}</SelectItem>
          ))}
        </Select>
        <Select
          name="hourSelected"
          label="What time would you like?"
          variant="bordered"
          isInvalid={!!formState?.errors.hourSelected}
          errorMessage={formState?.errors.hourSelected}
        >
          {Hours.map((hour) => (
            <SelectItem key={hour.value} value={hour.value}>
              {hour.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          name="service"
          label="What service would you like?"
          variant="bordered"
          isInvalid={!!formState?.errors.service}
          errorMessage={formState?.errors.service}
        >
          {professionalServices.map((service) => (
            <SelectItem key={service.id} value={service.id}>
              {service.serviceName} - {service.price}
            </SelectItem>
          ))}
        </Select>
      </Wrapper>
      <Title title="Personal information" />
      <Wrapper>
        <Input
          name="name"
          label="name"
          variant="bordered"
          isInvalid={!!formState?.errors.name}
          errorMessage={formState?.errors.name}
        />
        <Input
          name="email"
          type="email"
          label="e-mail address"
          variant="bordered"
          isInvalid={!!formState?.errors.email}
          errorMessage={formState?.errors.email}
        />
        <Input
          name="phone"
          label="telephone number"
          variant="bordered"
          isInvalid={!!formState?.errors.phone}
          errorMessage={formState?.errors.phone}
        />
      </Wrapper>
      <Textarea
        name="textMessage"
        label="Would you like to add something?"
        variant="bordered"
      />

      {formState?.errors._form && (
        <p className="mb-4 rounded-lg border border-red-400 bg-red-200 p-1.5 text-red-700 shadow">
          {formState.errors._form}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <ButtonFormSubmit title="Request appointment" color="primary" />
      </div>
    </form>
  )
}
