'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Building,
  ContactRound,
  FolderGit2,
  ListTodo,
  FileStack,
  User
} from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
      <div className='flex items-center justify-between p-4'>
        {!isCollapsed && <h2 className='text-xl font-bold'>Menu</h2>}
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight className='h-6 w-6' /> : <ChevronLeft className='h-6 w-6' />}
        </Button>
      </div>
      <nav className='flex flex-col justify-between h-[calc(100%-80px)]'>
        <ul className='space-y-2'>
          <li>
            <a
              href='/'
              className='flex items-center p-4 hover:bg-gray-700'>
              <Home className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Home</span>}
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-4 hover:bg-gray-700'>
              <User className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Profile</span>}
            </a>
          </li>
          <li>
            <a
              href='/company'
              className='flex items-center p-4 hover:bg-gray-700'>
              <Building className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Company</span>}
            </a>
          </li>
          <li>
            <a
              href='/contacts'
              className='flex items-center p-4 hover:bg-gray-700'>
              <ContactRound className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Contacts</span>}
            </a>
          </li>
          <li>
            <a
              href='/projects'
              className='flex items-center p-4 hover:bg-gray-700'>
              <FolderGit2 className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Projects</span>}
            </a>
          </li>
          <li>
            <a
              href='/tasks'
              className='flex items-center p-4 hover:bg-gray-700'>
              <ListTodo className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Tasks</span>}
            </a>
          </li>
          <li>
            <a
              href='/documents'
              className='flex items-center p-4 hover:bg-gray-700'>
              <FileStack className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Documents</span>}
            </a>
          </li>
        </ul>
        {/* User auth area */}
        <div className='p-4'>
          <SignedOut>
            <SignInButton mode='modal'>
              <Button
                variant='default'
                size='default'
                className={`w-full mb-2 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${
                  isCollapsed ? 'px-2' : 'px-4'
                }`}>
                {isCollapsed ? 'In' : 'Sign In'}
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button
                variant='default'
                size='default'
                className={`w-full hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${
                  isCollapsed ? 'px-2' : 'px-4'
                }`}>
                {isCollapsed ? 'Up' : 'Sign Up'}
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div
              className={`flex items-center ${
                !isCollapsed ? 'justify-between' : 'justify-center'
              }`}>
              <UserButton afterSignOutUrl='/' />
              {!isCollapsed && <span className='ml-2'>Account</span>}
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
