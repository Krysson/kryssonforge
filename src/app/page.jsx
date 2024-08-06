import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Hero from '@/components/hero'
// import NavigationMenu from '@/components/NavigationMenu'

export default function Home() {
  return (
    <div className='page-container'>
      <Hero />

      <div className='content'>{/* Your page content goes here */}</div>
    </div>
  )
}
