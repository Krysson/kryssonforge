// src/components/FooterLinks.jsx
import React from 'react';
import Link from 'next/link';

const FooterLinks = () => {
  const linkSections = [
    {
      title: 'Product',
      links: [
        { name: 'Overview', url: '/overview' },
        { name: 'Features', url: '/features' },
        { name: 'Solutions', url: '/solutions' },
        { name: 'Tutorials', url: '/tutorial' },
        { name: 'Pricing', url: '/pricing' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '/about' },
        { name: 'Careers', url: '/careers' },
        { name: 'Press', url: '/press' },
        { name: 'News', url: '/news' },
        { name: 'Contact', url: '/cont' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', url: '/blog' },
        { name: 'Newsletter', url: '/newsletter' },
        { name: 'Events', url: '/events' },
        { name: 'Help Center', url: '/help' },
        { name: 'Tutorial', url: '/tutorial' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms', url: '/terms' },
        { name: 'Privacy', url: '/privacy' },
        { name: 'Cookies', url: '/cookies' },
        { name: 'Licenses', url: '/licenses' },
        { name: 'Settings', url: '/settings' }
      ]
    }
  ];

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
                  href={link.url}
                  className='text-base text-gray-300 hover:text-white'>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
