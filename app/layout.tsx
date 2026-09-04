import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Myria Consulting | Virtual Management Consulting',
  description: 'Myria Consulting combines senior management consulting thinking with a virtual team of specialist advisors.',
  keywords: ['Myria', 'Myria Consulting', 'Virtual Management Consulting', 'Virtual Advisory Service', 'Distributed Systems', 'Management Consulting', 'Advisory Service'],
  generator: 'myria.app',
  robots: 'index, follow',
  
  openGraph: {
    title: 'Advisory Labs',
    description: 'Professional advisory service for distributed systems',
    type: 'website',
  },

    icons: {
    icon: [
      {
        url: '/images/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/images/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },
}




export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white text-black antialiased dark:bg-black dark:text-white">
      <body className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        
      </body>
    </html>
  )
}
