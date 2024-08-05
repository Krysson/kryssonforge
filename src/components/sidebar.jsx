'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
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
      <nav className='mt-8'>
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
      </nav>
    </div>
  )
}

export default Sidebar
