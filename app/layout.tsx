import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@/components/consulting/home/consulting.css'
import '@/components/consulting/insights/research.css'
import SiteHeader from '@/components/navigation/site-header'
import { SITE_URL } from '@/lib/seo'


const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Myria Consulting',
  title: 'Myria Consulting | Management Advisory & Intelligent Systems',
  description: 'Myria helps organizations improve decisions, operations and execution through management expertise, intelligent systems and AI advisory.',
  keywords: ['Myria Consulting', 'Management Consulting', 'Business Transformation', 'AI-Enabled Enterprise', 'Organizational Change', 'Intelligent Systems', 'Advisory Lab'],
  generator: 'Myria Consulting',
  robots: 'index, follow',
  
  openGraph: {
    title: 'Myria Consulting | Management Advisory & Intelligent Systems',
    description: 'Management expertise and intelligent systems helping organizations turn strategy into action.',
    url: SITE_URL,
    siteName: 'Myria Consulting',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myria Consulting | Management Advisory & Intelligent Systems',
    description: 'Better decisions. Stronger execution.',
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
    { media: '(prefers-color-scheme: light)', color: '#f7f4ee' },
    { media: '(prefers-color-scheme: dark)', color: '#142b35' },
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
        <SiteHeader>{null}</SiteHeader>
        {children}
   
      </body>
    </html>
  )
}
