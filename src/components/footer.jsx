// src/components/Footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <footer className='p-4 bg-gray-800 text-white text-center'>
      <p>&copy; {new Date().getFullYear()} KryssonForge. All rights reserved.</p>
    </footer>
  )
}

export default Footer
