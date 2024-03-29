import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OBC - Da Vinci',
  description: 'Plataforma de Agendamento de Serviços',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-screen pb-12`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
