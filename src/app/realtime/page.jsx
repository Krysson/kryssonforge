import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const RealTimePage = () => {
  return (
    <>
      <div className='text-center font-extrabold text-3xl bg-slate-100 text-slate-800'>
        Real-Time Communication
      </div>
      <div className='grid gap-4 grid-cols-2'>
        <div className=' mx-auto p-7 my-48 bg-slate-100 rounded-lg border-2 border-slate-300 hover:drop-shadow-xl'>
          <Button
            asChild
            variant='destructive'
            size='lg'
            className='  text-2xl'>
            <Link href='https://kryssonvid.vercel.app/'>Start Video Conference</Link>
          </Button>
        </div>
        <div className='mx-auto p-7 my-48 bg-slate-100 rounded-lg border-2 border-slate-300 hover:drop-shadow-xl'>
          <Button
            asChild
            variant='destructive'
            size='lg'
            className='text-2xl'>
            <Link href='#'>Start Real-Time Chat</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default RealTimePage;
