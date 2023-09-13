import Aside from '@/components/aside'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Enneagram',
  description: 'Next.js Enneagram',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`flex ${inter.className}`}
      >
        <Aside />
        {children}
      </body>
    </html>
  )
}
