import UpsertServiceForm from '@/components/forms/upsert-service-form'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { BiChevronLeft } from 'react-icons/bi'

export default async function NewServicesPage() {
  return (
    <div>
      <Link href="/services" className="inline-flex">
        <Button size="sm" className="font-medium">
          <BiChevronLeft size={20} /> Previous
        </Button>
      </Link>
      <UpsertServiceForm />
    </div>
  )
}
