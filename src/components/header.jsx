import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='fixed top-0 right-0 left-16 z-1 flex justify-center items-center p-4 bg-gray-800 text-white transition-all duration-300'>
      <div className='logo'>
        <Link href='/'>
          <h1 className='text-2xl font-bold mx-5 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
            Krysson<span className='text-red-700 font-extrabold'>Forge</span>
          </h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
