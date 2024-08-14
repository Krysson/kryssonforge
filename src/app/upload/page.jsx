'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload.',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Success',
          description: `File uploaded successfully: ${data.url}`
        });
        // Redirect to the files page after a short delay
        setTimeout(() => router.push('/files'), 1500);
      } else {
        toast({
          title: 'Error',
          description: `Upload failed: ${data.error || 'Unknown error'}`,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error: ${error.message}`,
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-4'>Upload File</h1>
      <div className='flex items-center space-x-4'>
        <input
          type='file'
          onChange={handleFileChange}
          className='mb-4 p-2 border rounded'
        />
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      <Button
        variant='outline'
        onClick={() => router.push('/files')}
        className='mt-4'>
        Back to Files
      </Button>
    </div>
  );
}
