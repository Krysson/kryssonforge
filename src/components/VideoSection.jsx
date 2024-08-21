// src/components/VideoSection.jsx
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { Button } from './ui/button';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const VideoSection = () => {
  return (
    <Card className='w-full h-[600px]'>
      <CardHeader>
        <div className='flex text-3xl items-center'>
          <Video className='mr-2' />
          <span className='font-semibold '>Video Conference</span>
        </div>
      </CardHeader>
      <CardContent className='h-[calc(100%-60px)]  flex items-center justify-center'>
        <div>
          <Button
            asChild
            variant='destructive'
            size='lg'
            className='text-2xl'>
            <Link href='https://kryssonvid.vercel.app/'>Start Video Conference</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoSection;
