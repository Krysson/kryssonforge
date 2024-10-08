import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    /* Hero Section */

    <section className='pt-24 pb-20 px-4 md:px-0'>
      {' '}
      {/* Increased top padding to account for fixed header */}
      <div className='container mx-auto flex flex-col md:flex-row items-center'>
        <div className='md:w-1/2 mb-10 md:mb-0'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            Everything all together, in one place, at the same time.
          </h1>
          <p className='text-xl mb-8 mr-5'>
            Improve project workflow and collaboration. Complete more project on time and under
            budget.
          </p>
          <div className='flex space-x-4'>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white'>Get Started</Button>
            {/* <Button variant='outline'>Download IDE App</Button> */}
          </div>
        </div>

        <div className='md:h-1/2 md:w-1/2 aspect-w-16 aspect-h-9'>
          <Image
            src={'/images/buildAngleTrans.png'}
            width={1200}
            height={800}
            alt='KryssonForge Logo'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
