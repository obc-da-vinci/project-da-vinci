import ButtonDeleteService from '@/components/delete-service-button'
import Link from 'next/link'

export default async function EditServicesPage() {
  return (
    <div>
      <h1>Edit Services Page</h1>
      <Link href="/services">Back</Link>
      <ButtonDeleteService />
    </div>
  )
}
