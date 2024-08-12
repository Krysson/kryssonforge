import Link from 'next/link'
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Head from 'next/head'
// import Header from '@/components/header'
// import Sidebar from '@/components/sidebar'
import HeaderWithSidebar from '@/components/header-with-sidebar'

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
          <ClerkLoading>
            <div className='fixed top 0 w-screen h-screen bg-white flex justify-center items-center'>
              <p className='text-2xl font-bold text-gray-900'>Loading...</p>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <HeaderWithSidebar />
            <main className='mt-16 ml-4 p-4 transition-all duration-300'>{children}</main>
          </ClerkLoaded>
          <Footer /> {/* Add the Footer component */}
        </body>
      </html>
    </ClerkProvider>
  )
}
