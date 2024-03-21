import { getServices } from '@/services/professional'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { BiPlusCircle } from 'react-icons/bi'

export default async function ServicesPage() {
  const myServices = await getServices()

  return (
    <div>
      <Link href="/services/new" className="flex justify-end">
        <Button color="primary" size="sm" className="font-medium">
          <BiPlusCircle color="white" size={20} /> New service
        </Button>
      </Link>
      {myServices && <pre>{JSON.stringify(myServices, null, 2)}</pre>}
    </div>
  )
}
