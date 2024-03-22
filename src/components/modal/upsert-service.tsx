'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from '@nextui-org/react'
import { BiPlusCircle } from 'react-icons/bi'
import { NumericFormat } from 'react-number-format'
import ButtonFormSubmit from '../forms/button-form-submit'
import { Services } from '@prisma/client'
import { useFormState } from 'react-dom'
import * as actions from '@/actions'

export default function UpsertServiceModal({
  professionalId,
  service,
}: {
  professionalId: string
  service?: Services
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [formState, action] = useFormState(actions.createService, {
    success: false,
    errors: {},
  })

  return (
    <>
      <Button onPress={onOpen} color="primary" className="font-medium">
        <BiPlusCircle color="white" size={20} /> New service
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form action={action}>
              <ModalHeader className="flex flex-col gap-1">
                Add new service
                {formState?.success && (
                  <span className="text-center text-sm font-medium text-emerald-500">
                    Service successfully added!
                  </span>
                )}
              </ModalHeader>
              <ModalBody>
                <input type="hidden" name="serviceId" value={service?.id} />
                <input
                  type="hidden"
                  name="professionalId"
                  value={professionalId}
                />
                <div>
                  <label htmlFor="serviceName" className="ml-1 text-sm">
                    Service name
                  </label>
                  <Input
                    id="serviceName"
                    name="serviceName"
                    placeholder="Ex: Therapeutic Massage"
                    defaultValue={service?.serviceName}
                    isInvalid={!!formState?.errors.serviceName}
                    errorMessage={formState?.errors.serviceName}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="ml-1 text-sm">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the offered service..."
                    defaultValue={service?.description}
                    isInvalid={!!formState?.errors.description}
                    errorMessage={formState?.errors.description}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="ml-1 text-sm">
                    Price per session
                  </label>
                  <NumericFormat
                    id="price"
                    name="price"
                    thousandSeparator={true}
                    prefix={'$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    customInput={Input}
                    placeholder="$ 0.00"
                    defaultValue={service?.price}
                    isInvalid={!!formState?.errors.price}
                    errorMessage={formState?.errors.price}
                  />
                </div>
                {formState?.errors._form && (
                  <p className="rounded-lg border border-red-400 bg-red-200 p-1.5 font-medium text-foreground-600">
                    {formState.errors._form}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
                <ButtonFormSubmit title="Save" color="primary" />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
