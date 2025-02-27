import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700']
})

export const metadata: Metadata = {
  title: 'Sub4you',
  description: 'Subscription sharing platform',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
