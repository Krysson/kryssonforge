import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import NavigationMenu from '@/components/NavigationMenu'

export default function Home() {
  return (
    <div className='page-container'>
      <p className='text-4xl'>CLEAN START</p>
      {/* <NavigationMenu /> */}
      <div className='content'>
        {/* Your page content goes here */}
        <Button
          asChild
          variant='default'
          size='default'
          className='p-5 mx-3'>
          <Link href='/company'>Company</Link>
        </Button>
        <Button
          asChild
          variant='default'
          size='default'
          className='p-5 mx-3'>
          <Link href='/contacts'>Contacts</Link>
        </Button>
        <Button
          asChild
          variant='default'
          size='default'
          className='p-5 mx-3'>
          <Link href='/documents'>Documents</Link>
        </Button>
        <Button
          asChild
          variant='default'
          size='default'
          className='p-5 mx-3'>
          <Link href='/projects'>Projects</Link>
        </Button>
        <Button
          asChild
          variant='default'
          size='default'
          className='p-5 mx-3'>
          <Link href='/tasks'>Tasks</Link>
        </Button>
      </div>
    </div>
  )
}
