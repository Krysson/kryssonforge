'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const AddCompanyForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    companyNumber: '',
    mainContactId: '', // Change this to mainContactId
    mainPhone: '',
    status: '',
    address: {
      street: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    },
    contactIDs: [], // Add this
    userIDs: [] // Add this
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    };
    console.log('Data being sent:', dataToSend);

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        console.log('Company added successfully');
        router.push('/company');
      } else {
        const errorData = await response.json();
        console.error('Failed to add company:', errorData);
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
        name='mainContactId'
        value={formData.mainContactId}
        onChange={e => handleChange('mainContactId', e.target.value)}
        placeholder='Main Contact ID'
        required
      />
      <Input
        name='mainPhone'
        value={formData.mainPhone}
        onChange={e => handleChange('mainPhone', e.target.value)}
        placeholder='Main Phone'
        required
      />
      <Select
        name='status'
        value={formData.status}
        onValueChange={value => handleChange('status', value)}>
        <SelectTrigger>
          <SelectValue placeholder='Select Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Active'>Active</SelectItem>
          <SelectItem value='Inactive'>Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name='street'
        value={formData.address.street}
        onChange={e => handleAddressChange('street', e.target.value)}
        placeholder='Street'
        required
      />
      <Input
        name='street2'
        value={formData.address.street2}
        onChange={e => handleAddressChange('street2', e.target.value)}
        placeholder='Street 2 (Optional)'
      />
      <Input
        name='city'
        value={formData.address.city}
        onChange={e => handleAddressChange('city', e.target.value)}
        placeholder='City'
        required
      />
      <Input
        name='state'
        value={formData.address.state}
        onChange={e => handleAddressChange('state', e.target.value)}
        placeholder='State'
        required
      />
      <Input
        name='zip'
        value={formData.address.zip}
        onChange={e => handleAddressChange('zip', e.target.value)}
        placeholder='ZIP Code'
        required
      />
      <Input
        name='contactIDs'
        value={formData.contactIDs.join(',')}
        onChange={e => handleChange('contactIDs', e.target.value.split(','))}
        placeholder='Contact IDs (comma-separated)'
      />
      <Input
        name='userIDs'
        value={formData.userIDs.join(',')}
        onChange={e => handleChange('userIDs', e.target.value.split(','))}
        placeholder='User IDs (comma-separated)'
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
