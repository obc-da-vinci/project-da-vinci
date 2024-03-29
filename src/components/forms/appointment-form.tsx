'use client'

import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import ButtonFormSubmit from './button-form-submit'
import { ReactNode } from 'react'

export default function AppointmentForm() {
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

  return (
    <form
      action={''}
      className="container mx-auto space-y-3 rounded-xl border p-5 shadow"
    >
      <Title title="Request appointment" />
      <Wrapper>
        <Select label="What day are you looking for?" variant="bordered">
          <SelectItem key={1}>item 1</SelectItem>
        </Select>
        <Select label="What time would you like?" variant="bordered">
          <SelectItem key={1}>item 1</SelectItem>
        </Select>
      </Wrapper>
      <Title title="Personal information" />
      <Wrapper>
        <Input label="name" variant="bordered" />
        <Input label="e-mail address" variant="bordered" />
        <Input label="telephone number" variant="bordered" />
      </Wrapper>
      <Textarea label="additional message?" variant="bordered" />
      <div className="mt-6 flex justify-end">
        <ButtonFormSubmit title="Request appointment" color="primary" />
      </div>
    </form>
  )
}
