// src/app/api/crm/route.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const AddForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    companyNumber: '',
    mainPhone: '',
    status: '',
    contacts: []
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/crm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/crm');
      } else {
        console.error('Failed to add company/contact');
      }
    } catch (error) {
      console.error('Error adding company/contact:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'>
      <Input
        name='name'
        value={formData.name}
        onChange={e => handleChange('name', e.target.value)}
        placeholder='Company Name'
        required
      />
      <Input
        name='companyNumber'
        value={formData.companyNumber}
        onChange={e => handleChange('companyNumber', e.target.value)}
        placeholder='Company Number'
        required
      />
      <Input
        name='mainPhone'
        value={formData.mainPhone}
        onChange={e => handleChange('mainPhone', e.target.value)}
        placeholder='Main Phone'
        required
      />
      <Input
        name='status'
        value={formData.status}
        onChange={e => handleChange('status', e.target.value)}
        placeholder='Status'
        required
      />
      {/* Add contact fields here */}
      <Button
        type='submit'
        className='bg-blue-600 text-white'>
        Add Company/Contact
      </Button>
    </form>
  );
};

export default AddForm;
