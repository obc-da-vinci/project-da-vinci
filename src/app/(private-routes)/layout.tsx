import Navbar from '@/components/navbar'
import { useSession } from '@/hooks/useSession'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await useSession()
  if (!user) redirect('/')

  return (
    <>
      <Navbar authenticated={!!user?.email} />
      <div className="container mx-auto max-w-[96%] pt-6">{children}</div>
    </>
  )
}
