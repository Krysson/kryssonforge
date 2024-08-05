// src/components/Footer.jsx
import React from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div className='logo'>
        <Link href='/'>
          <h1 className='text-2xl font-bold mx-5 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
            Krysson<span className='text-red-800 font-extrabold'>Forge</span>
          </h1>
        </Link>
        {/* Placeholder for logo */}
      </div>
      <div className='auth-buttons'>
        <SignedOut>
          <Button
            variant='default'
            size='default'
            className='p-5 mx-3 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
            <SignInButton />
          </Button>
          <Button
            variant='default'
            size='default'
            className='p-5 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
            <SignUpButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
