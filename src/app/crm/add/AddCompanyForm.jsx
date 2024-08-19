// src/app/crm/AddCompanyForm.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddCompanyForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    companyNumber: '',
    mainPhone: '',
    status: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          companyNumber: formData.companyNumber,
          mainPhone: formData.mainPhone,
          status: formData.status,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip
          }
        })
      });

      if (response.ok) {
        router.push('/crm');
      } else {
        console.error('Failed to add company');
      }
    } catch (error) {
      console.error('Error adding company:', error);
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
      <Input
        name='street'
        value={formData.street}
        onChange={e => handleChange('street', e.target.value)}
        placeholder='Street Address'
        required
      />
      <Input
        name='city'
        value={formData.city}
        onChange={e => handleChange('city', e.target.value)}
        placeholder='City'
        required
      />
      <Input
        name='state'
        value={formData.state}
        onChange={e => handleChange('state', e.target.value)}
        placeholder='State'
        required
      />
      <Input
        name='zip'
        value={formData.zip}
        onChange={e => handleChange('zip', e.target.value)}
        placeholder='ZIP Code'
        required
      />
      <Button
        type='submit'
        className='bg-blue-600 text-white'>
        Add Company
      </Button>
    </form>
  );
};

export default AddCompanyForm;
