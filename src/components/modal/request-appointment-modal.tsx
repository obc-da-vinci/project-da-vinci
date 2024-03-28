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
} from '@nextui-org/react'
import ButtonFormSubmit from '../forms/button-form-submit'

export default function RequestAppointmentModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        size="sm"
        className="font-medium"
      >
        request an appointment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form action={''}>
              <ModalHeader className="flex flex-col gap-1">
                Request an appointment
              </ModalHeader>
              <ModalBody>
                <select className="mb-4 outline-none">
                  <option value="" disabled selected>
                    What day are you looking for?
                  </option>
                </select>
                <select className="mb-4 outline-none">
                  <option value="" disabled selected>
                    What time would you like?
                  </option>
                </select>
                <Input label="name" variant="underlined" />
                <Input label="e-mail address" variant="underlined" />
                <Input label="telephone number" variant="underlined" />
              </ModalBody>
              <ModalFooter>
                <Button size="sm" onPress={onClose}>
                  Cancel
                </Button>
                <ButtonFormSubmit
                  title="Request appointment"
                  color="primary"
                  size="sm"
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
