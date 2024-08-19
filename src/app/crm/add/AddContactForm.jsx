// src/app/api/contacts/route.js
'use client';

import React, { useState, useEffect } from 'react';
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

const AddContactForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    companyId: ''
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/crm');
      } else {
        console.error('Failed to add contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'>
      <Input
        name='firstName'
        value={formData.firstName}
        onChange={e => handleChange('firstName', e.target.value)}
        placeholder='First Name'
        required
      />
      <Input
        name='lastName'
        value={formData.lastName}
        onChange={e => handleChange('lastName', e.target.value)}
        placeholder='Last Name'
        required
      />
      <Input
        name='email'
        value={formData.email}
        onChange={e => handleChange('email', e.target.value)}
        placeholder='Email'
        required
      />
      <Input
        name='phone'
        value={formData.phone}
        onChange={e => handleChange('phone', e.target.value)}
        placeholder='Phone'
        required
      />
      <Input
        name='role'
        value={formData.role}
        onChange={e => handleChange('role', e.target.value)}
        placeholder='Role'
        required
      />
      <Select onValueChange={value => handleChange('companyId', value)}>
        <SelectTrigger>
          <SelectValue placeholder='Select Company' />
        </SelectTrigger>
        <SelectContent>
          {companies.map(company => (
            <SelectItem
              key={company.id}
              value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type='submit'
        className='bg-blue-600 text-white'>
        Add Contact
      </Button>
    </form>
  );
};

export default AddContactForm;
