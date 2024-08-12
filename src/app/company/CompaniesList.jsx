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

const CompaniesList = ({ initialCompanies }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [companies, setCompanies] = useState(initialCompanies)

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className='flex justify-between mb-4 items-center'>
        <Link href='/company/add'>
          <Button className='bg-blue-600 text-white'>Add Company</Button>
        </Link>
        <div className='flex space-x-2 w-2/3'>
          <Input
            type='text'
            placeholder='Search companies...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='mb-4 w-full'
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company Number</TableHead>
            <TableHead>Main Contact</TableHead>
            <TableHead>Main Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map(company => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.companyNumber}</TableCell>
              <TableCell>{company.mainContact}</TableCell>
              <TableCell>{company.mainPhone}</TableCell>
              <TableCell>{company.status}</TableCell>
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

export default CompaniesList
