'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Define enums for roles and states
// change to pull from database
const ROLES = [
  'Manager',
  'Developer',
  'Designer',
  'HR Specialist',
  'Sales Representative',
  'Customer Support',
  'Marketing Specialist',
  'Data Analyst',
  'Project Manager',
  'Quality Assurance'
];

// change to something else, or make the states a component to get it out of here.

const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    role: '',
    email: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  const handleChange = (name, value) => {
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
  };

  return (
    <div className='p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>Add New Employee</h2>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'>
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium text-gray-700'>
              First Name
            </label>
            <Input
              id='firstName'
              name='firstName'
              type='text'
              value={formData.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              placeholder='Enter first name'
              className='mt-1'
            />
          </div>
          <div>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium text-gray-700'>
              Last Name
            </label>
            <Input
              id='lastName'
              name='lastName'
              type='text'
              value={formData.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              placeholder='Enter last name'
              className='mt-1'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='employeeId'
              className='block text-sm font-medium text-gray-700'>
              Employee ID
            </label>
            <Input
              id='employeeId'
              name='employeeId'
              type='text'
              value={formData.employeeId}
              onChange={e => handleChange('employeeId', e.target.value)}
              placeholder='Enter employee ID'
              className='mt-1'
            />
          </div>
          <div>
            <label
              htmlFor='role'
              className='block text-sm font-medium text-gray-700'>
              Role
            </label>
            <Select
              value={formData.role}
              onValueChange={value => handleChange('role', value)}>
              <SelectTrigger className='w-full mt-1'>
                <SelectValue placeholder='Select a role' />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map(role => (
                  <SelectItem
                    key={role}
                    value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder='Enter email'
              className='mt-1'
            />
          </div>
          <div>
            <label
              htmlFor='phoneNumber'
              className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <Input
              id='phoneNumber'
              name='phoneNumber'
              type='tel'
              value={formData.phoneNumber}
              onChange={e => handleChange('phoneNumber', e.target.value)}
              placeholder='Enter phone number'
              className='mt-1'
            />
          </div>
        </div>

        <div>
          <h3 className='text-lg font-medium text-gray-700 mb-2'>Address</h3>
          <div className='space-y-2'>
            <div>
              <label
                htmlFor='address.street'
                className='block text-sm font-medium text-gray-700'>
                Street
              </label>
              <Input
                id='address.street'
                name='address.street'
                type='text'
                value={formData.address.street}
                onChange={e => handleChange('address.street', e.target.value)}
                placeholder='Enter street address'
                className='mt-1'
              />
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='address.city'
                  className='block text-sm font-medium text-gray-700'>
                  City
                </label>
                <Input
                  id='address.city'
                  name='address.city'
                  type='text'
                  value={formData.address.city}
                  onChange={e => handleChange('address.city', e.target.value)}
                  placeholder='Enter city'
                  className='mt-1'
                />
              </div>
              <div>
                <label
                  htmlFor='address.state'
                  className='block text-sm font-medium text-gray-700'>
                  State
                </label>
                <Select
                  value={formData.address.state}
                  onValueChange={value => handleChange('address.state', value)}>
                  <SelectTrigger className='w-full mt-1'>
                    <SelectValue placeholder='Select a state' />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map(state => (
                      <SelectItem
                        key={state}
                        value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label
                htmlFor='address.zip'
                className='block text-sm font-medium text-gray-700'>
                ZIP Code
              </label>
              <Input
                id='address.zip'
                name='address.zip'
                type='text'
                value={formData.address.zip}
                onChange={e => handleChange('address.zip', e.target.value)}
                placeholder='Enter ZIP code'
                className='mt-1'
              />
            </div>
          </div>
        </div>

        <Button
          type='cancel'
          variant='destructive'
          className='w-full'>
          Cancel
        </Button>
        <Button
          type='submit'
          className='w-full'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
