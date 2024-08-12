import React from 'react'
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
import ContactsList from './ContactsList'
import { fetchContacts, fetchCompanies } from '/lib/data'

export default async function ContactsPage() {
  const contacts = await fetchContacts()
  const companies = await fetchCompanies()

  return (
    <div className='flex h-full w-full'>
      {/* Lists sidebar */}
      <div className='w-1/6 bg-gray-100 p-4 overflow-y-auto'>
        <h2 className='text-xl font-bold mb-4'>Company</h2>
        <ul>
          <li className='cursor-pointer p-2 hover:bg-gray-200'>All Contacts</li>
          {companies.map(company => (
            <li
              key={company.id}
              className='cursor-pointer p-2 hover:bg-gray-200'>
              {company.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Contacts table */}
      <div className='w-5/6 p-4'>
        <ContactsList initialContacts={contacts} />
      </div>
    </div>
  )
}
