// src/components/FooterLinks.jsx
import React from 'react'
import Link from 'next/link'

const FooterLinks = () => {
  const linkSections = [
    {
      title: 'Product',
      links: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing']
    },
    {
      title: 'Company',
      links: ['About us', 'Careers', 'Press', 'News', 'Contact']
    },
    {
      title: 'Resources',
      links: ['Blog', 'Newsletter', 'Events', 'Help center', 'Tutorials']
    },
    {
      title: 'Legal',
      links: ['Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings']
    }
  ]

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
      {linkSections.map((section, index) => (
        <div key={index}>
          <h3 className='text-sm font-semibold text-gray-400 uppercase mb-4'>{section.title}</h3>
          <ul>
            {section.links.map((link, linkIndex) => (
              <li
                key={linkIndex}
                className='mb-2'>
                <Link
                  href='#'
                  className='text-base text-gray-300 hover:text-white'>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default FooterLinks
