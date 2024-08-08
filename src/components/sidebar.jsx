'use client'
import React, { useState } from 'react'
import Link from 'next/link'
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
  LogIn,
  UserPlus,
  User
} from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true) // State variable to track if the sidebar is collapsed or not

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed) // Function to toggle the sidebar collapse state
  }

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-full bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
      <div className='flex items-center justify-between p-4'>
        {!isCollapsed && (
          <h2 className='text-xl font-bold'>
            <span className='text-red-500'>Forge</span>Menu
          </h2>
        )}{' '}
        {/* Display the menu title if the sidebar is not collapsed */}
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight className='h-6 w-6' /> : <ChevronLeft className='h-6 w-6' />}{' '}
          {/* Display the appropriate chevron icon based on the sidebar collapse state */}
        </Button>
      </div>
      <nav className='flex flex-col justify-between h-[calc(100%-80px)]'>
        <ul className='space-y-2'>
          {/* Sidebar navigation items */}
          <li>
            <Link
              href='/'
              className='flex items-center p-4 hover:bg-gray-700'>
              <Home className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Home</span>}{' '}
              {/* Display the navigation item label if the sidebar is not collapsed */}
            </Link>
          </li>
          <li>
            <Link
              href='#'
              className='flex items-center p-4 hover:bg-gray-700'>
              <User className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Profile</span>}
            </Link>
          </li>
          <li>
            <Link
              href='/company'
              className='flex items-center p-4 hover:bg-gray-700'>
              <Building className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Company</span>}
            </Link>
          </li>
          <li>
            <Link
              href='/contacts'
              className='flex items-center p-4 hover:bg-gray-700'>
              <ContactRound className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Contacts</span>}
            </Link>
          </li>
          <li>
            <Link
              href='/projects'
              className='flex items-center p-4 hover:bg-gray-700'>
              <FolderGit2 className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Projects</span>}
            </Link>
          </li>
          <li>
            <Link
              href='/tasks'
              className='flex items-center p-4 hover:bg-gray-700'>
              <ListTodo className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Tasks</span>}
            </Link>
          </li>
          <li>
            <Link
              href='/documents'
              className='flex items-center p-4 hover:bg-gray-700'>
              <FileStack className='h-5 w-5' />
              {!isCollapsed && <span className='ml-4'>Documents</span>}
            </Link>
          </li>
        </ul>
        {/* User authentication area */}
        <div className='p-4'>
          <SignedOut>
            {/* Display sign in and sign up buttons if the user is signed out */}
            <SignInButton mode='modal'>
              <Button
                variant='default'
                size='default'
                className={`w-full mb-2 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${
                  isCollapsed ? 'px-2' : 'px-4'
                }`}>
                {' '}
                <LogIn />
                {!isCollapsed && 'Sign In'}{' '}
                {/* Display the appropriate label based on the sidebar collapse state */}
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button
                variant='default'
                size='default'
                className={`w-full hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${
                  isCollapsed ? 'px-2' : 'px-4'
                }`}>
                <UserPlus />
                {!isCollapsed && 'Sign Up'}{' '}
                {/* Display the appropriate label based on the sidebar collapse state */}
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            {/* Display user account button if the user is signed in */}
            <div
              className={`flex items-center ${
                !isCollapsed ? 'justify-between' : 'justify-center'
              }`}>
              <UserButton afterSignOutUrl='/' />
              {!isCollapsed && <span className='ml-2'></span>}{' '}
              {/* Display the account label if the sidebar is not collapsed */}
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
