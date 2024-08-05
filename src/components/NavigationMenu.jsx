'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import './NavigationMenu.css'

const NavigationMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <nav className={`navigation-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        onClick={toggleCollapse}
        className='collapse-button'>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      <ul>
        <li>
          <Link href='/company'>
            <p>Company</p>
          </Link>
        </li>
        <li>
          <Link href='/contacts'>
            <p>Contacts</p>
          </Link>
        </li>
        <li>
          <Link href='/documents'>
            <p>Documents</p>
          </Link>
        </li>
        <li>
          <Link href='/projects'>
            <p>Projects</p>
          </Link>
        </li>
        <li>
          <Link href='/tasks'>
            <p>Tasks</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationMenu
