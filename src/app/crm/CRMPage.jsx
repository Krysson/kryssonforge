// src/app/crm/CRMPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const CRMPage = () => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/companies');
        const data = await response.json();
        setCompanies(data);
        setContacts(data.flatMap(company => company.contacts));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    return (
      (selectedCompany ? contact.companyId === selectedCompany : true) &&
      (selectedRole ? contact.role === selectedRole : true) &&
      (contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const showAllContacts = () => {
    setSearchTerm('');
    setSelectedCompany('');
    setSelectedRole('');
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>CRM</h1>
      <div className='flex flex-col sm:flex-row justify-between mb-4 items-center'>
        <div className='hidden sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-0'>
          <Link href='/crm/add-company'>
            <Button variant='default'>Add Company</Button>
          </Link>
          <Link href='/crm/add-contact'>
            <Button variant='secondary'>Add Contact</Button>
          </Link>
          <Button
            onClick={showAllContacts}
            variant='outline'>
            Show All Contacts
          </Button>
        </div>
        <div className='sm:hidden pb-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='border-2 border-gray-500'
                variant='secondary'>
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href='/crm/add-company'>Add Company</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/crm/add-contact'>Add Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={showAllContacts}>Show All Contacts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex w-full sm:w-2/3'>
          <Input
            type='text'
            placeholder='Search contacts...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='w-full'
          />
          <Select onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue placeholder='Filter by Company' />
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
          <Select onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder='Filter by Role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All Roles'>All Roles</SelectItem>
              <SelectItem value='Manager'>Manager</SelectItem>
              <SelectItem value='Developer'>Developer</SelectItem>
              <SelectItem value='Designer'>Designer</SelectItem>
            </SelectContent>
          </Select>
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
                {companies.find(company => company.id === contact.companyId)?.name}
              </TableCell>
              <TableCell>
                <div className='hidden sm:flex space-x-2'>
                  <Button
                    variant='secondary'
                    className='mx-2'>
                    Edit
                  </Button>
                  <Button variant='destructive'>Delete</Button>
                </div>
                <div className='sm:hidden'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className='border-gray-500 '
                        variant='outline'>
                        Menu
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => handleEdit(row.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleDelete(row.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CRMPage;
