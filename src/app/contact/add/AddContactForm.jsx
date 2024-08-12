'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const AddContactForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    companyIds: []
  })

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    // Fetch companies when component mounts
    const fetchCompanies = async () => {
      const response = await fetch('/api/companies')
      const data = await response.json()
      setCompanies(data)
    }
    fetchCompanies()
  }, [])

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          companyIds: formData.companyIds ? [formData.companyIds] : []
        })
      })

      if (response.ok) {
        router.push('/contacts')
      } else {
        console.error('Failed to add contact')
      }
    } catch (error) {
      console.error('Error adding contact:', error)
    }
  }

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
        name='middleName'
        value={formData.middleName}
        onChange={e => handleChange('middleName', e.target.value)}
        placeholder='Middle Name'
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
        type='email'
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
      <Select
        name='role'
        value={formData.role}
        onValueChange={value => handleChange('role', value)}>
        <SelectTrigger>
          <SelectValue placeholder='Select Role' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=''>Select Role</SelectItem>
          <SelectItem value='Employee'>Employee</SelectItem>
          <SelectItem value='Project Manager'>Project Manager</SelectItem>
          <SelectItem value='Estimator'>Estimator</SelectItem>
        </SelectContent>
      </Select>
      <Select
        name='companyIds'
        value={formData.companyIds}
        onValueChange={value => handleChange('companyIds', [value])}>
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
  )
}

export default AddContactForm
