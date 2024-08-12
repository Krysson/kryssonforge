'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {
  Menu,
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

const HeaderWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    if (isCollapsed) {
      setIsCollapsed(false)
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false)
        setIsCollapsed(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/about', icon: User, label: 'My Company' },
    { href: '/company', icon: Building, label: 'Company' },
    { href: '/contact', icon: ContactRound, label: 'Contacts' },
    { href: '/projects', icon: FolderGit2, label: 'Projects' },
    { href: '/tasks', icon: ListTodo, label: 'Tasks' },
    { href: '/documents', icon: FileStack, label: 'Documents' }
  ]

  return (
    <>
      <header className='fixed top-0 right-0 left-0 z-20 flex items-center p-4 bg-gray-800 text-white'>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}
          className='mr-4'>
          <Menu className='h-6 w-6' />
        </Button>
        <div className='flex-grow flex justify-center'>
          <Link href='/'>
            <h1 className='text-2xl font-bold mx-5 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
              Krysson<span className='text-red-700 font-extrabold'>Forge</span>
            </h1>
          </Link>
        </div>
      </header>

      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-10 h-full bg-gray-800 text-white transition-all duration-300 ${
          isSidebarOpen ? (isCollapsed ? 'w-16' : 'w-64') : 'w-0'
        } overflow-hidden`}>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between p-4 mt-16'>
            {!isCollapsed && (
              <h2 className='text-xl font-bold'>
                <span className='text-red-500'>Forge</span>Menu
              </h2>
            )}
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleCollapse}>
              {isCollapsed ? (
                <ChevronRight className='h-6 w-6' />
              ) : (
                <ChevronLeft className='h-6 w-6' />
              )}
            </Button>
          </div>
          <nav className='flex-grow overflow-y-auto'>
            <ul className='space-y-2'>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className='flex items-center p-4 hover:bg-gray-700'>
                    <item.icon className='h-5 w-5' />
                    {!isCollapsed && <span className='ml-4'>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='p-4 mt-auto'>
            <SignedOut>
              {!isCollapsed && (
                <>
                  <SignInButton mode='modal'>
                    <Button
                      variant='default'
                      size='default'
                      className='w-full mb-2 hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
                      <LogIn className='mr-2' />
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode='modal'>
                    <Button
                      variant='default'
                      size='default'
                      className='w-full hover:bg-slate-700/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90'>
                      <UserPlus className='mr-2' />
                      Sign Up
                    </Button>
                  </SignUpButton>
                </>
              )}
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
        </div>
      </div>
    </>
  )
}

export default HeaderWithSidebar
