// src/components/ErrorMessage.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => (
  <div className='flex items-center justify-center h-screen'>
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
      role='alert'>
      <strong className='font-bold'>Error!</strong>
      <span className='block sm:inline'> {message}</span>
      <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
        <AlertCircle className='h-6 w-6 text-red-500' />
      </span>
    </div>
  </div>
);

export default ErrorMessage;
