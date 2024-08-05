import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h2 className='text-2xl font-bold pb-5'> Clean Start</h2>
      <div>
        <Button
          variant='default'
          size='default'>
          Button
        </Button>
      </div>
    </div>
  )
}
