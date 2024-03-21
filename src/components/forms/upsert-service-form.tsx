'use client'

import { Input, Textarea } from '@nextui-org/react'
import { NumericFormat } from 'react-number-format'
import ButtonFormSubmit from './button-form-submit'

export default function UpsertServiceForm() {
  return (
    <form action={''} className="mt-5 grid md:grid-cols-2 md:space-x-5">
      <div className="flex flex-col space-y-5">
        <Input name="serviceName" label="enter service name" />
        <Textarea name="description" label="describe your service" />
      </div>
      <div className="mt-5 flex flex-col space-y-5 md:mt-0">
        <NumericFormat
          thousandSeparator={true}
          prefix={'$'}
          decimalScale={2}
          fixedDecimalScale={true}
          customInput={Input}
          placeholder="$0.00"
        />
      </div>
      <div className="mt-5 md:col-span-2">
        <ButtonFormSubmit title="Save" wFull color="primary" />
      </div>
    </form>
  )
}
