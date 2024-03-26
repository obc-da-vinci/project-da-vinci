import Navbar from '@/components/navbar'

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar authenticated />
      <div className="container mx-auto max-w-[96%] pt-6">{children}</div>
    </>
  )
}
