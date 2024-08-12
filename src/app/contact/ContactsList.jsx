'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'

const ContactsList = ({ initialContacts }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [contacts, setContacts] = useState(initialContacts)

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    contact =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className='flex justify-between mb-4 items-center'>
        <Link href='/contacts/add'>
          <Button className='bg-blue-600 text-white'>Add Contact</Button>
        </Link>
        <div className='flex space-x-2 w-2/3'>
          <Input
            type='text'
            placeholder='Search contacts...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='mb-4 w-full'
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContacts.map(contact => (
            <TableRow key={contact.id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.role}</TableCell>
              <TableCell>
                {contact.companies?.map(company => company.name).join(', ') || 'N/A'}
              </TableCell>
              <TableCell>
                {contact.projects?.map(project => project.name).join(', ') || 'N/A'}
              </TableCell>
              <TableCell>
                <Button variant='secondary'>Edit</Button>
                <Button variant='destructive'>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ContactsList
