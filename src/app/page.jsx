import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Hero from '@/components/hero'
import FeatureCards from '@/components/featureCards'
// import NavigationMenu from '@/components/NavigationMenu'

export default function Home() {
  return (
    <div className='page-container'>
      <Hero />
      <FeatureCards />

      <div className='content'>{/* Your page content goes here */}</div>
    </div>
  )
}
