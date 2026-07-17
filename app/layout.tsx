import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pinnamount Escapes — A Pinnamount Legacy Universal Property',
  description: "The World's Finest Resorts & Retreats, One Platform",
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
