'use client'
import React, { useState, useEffect } from 'react'
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
import contactsData from '/JSON/contacts.json'
import companiesData from '/JSON/companies.json'
import projectsData from '/JSON/projects.json'

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (companiesData && companiesData.companies) {
      setCompanies(companiesData.companies)
    }
  }, [])

  // Helper function to get project names from IDs
  const getProjectNames = projectIds => {
    return projectIds
      .map(id => {
        const project = projectsData.projects.find(project => project.id === id)
        return project ? project.name : 'Unknown Project'
      })
      .join(', ')
  }

  // Filter contacts based on search term
  const filteredContacts = contactsData.contacts.filter(
    contact =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='flex h-full w-full'>
      {/* Lists sidebar */}
      <div className='w-1/6 bg-gray-100 p-4 overflow-y-auto'>
        <h2 className='text-xl font-bold mb-4'>Company</h2>
        <ul>
          <li className='cursor-pointer p-2 hover:bg-gray-200'>All Contacts</li>
          {companies.map((company, index) => (
            <li
              key={index}
              className='cursor-pointer p-2 hover:bg-gray-200'>
              {company.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Contacts table */}
      <div className='w-5/6 p-4'>
        <div className='flex justify-between mb-4 items-center'>
          <Button className='bg-blue-600 text-white'>Add</Button>
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
              <TableHead>
                <input type='checkbox' />
              </TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map(contact => (
              <TableRow key={contact.id}>
                <TableCell>
                  <input type='checkbox' />
                </TableCell>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{getProjectNames(contact.projectsId)}</TableCell>
                <TableCell>
                  <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>
                    {contact.role}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant='secondary'>Edit</Button>
                  <Button variant='destructive'>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ContactsPage
