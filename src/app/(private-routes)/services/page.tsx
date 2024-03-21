import ButtonDeleteService from '@/components/delete-service-button'
import { getServices } from '@/services/professional'

export default async function ServicesPage() {
  const myServices = await getServices()

  return (
    <div>
      <h1>Services Page</h1>
      {myServices && <pre>{JSON.stringify(myServices, null, 2)}</pre>}
      <ButtonDeleteService />
    </div>
  )
}
