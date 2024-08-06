import Link from 'next/link'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Head from 'next/head'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KryssonForge',
  description: 'Everything - Working Together'
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='en'>
        <body className={inter.className}>
          <Header /> {/* Add the Header component */}
          <Sidebar /> {/* Add the Sidebar component */}
          <main className='mt-16 ml-16 p-4 transition-all duration-300'>{children}</main>
          <Footer /> {/* Add the Footer component */}
        </body>
      </html>
    </ClerkProvider>
  )
}
