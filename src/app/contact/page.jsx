import React from 'react';
import ContactsList from './ContactsList';
import { fetchContacts } from '/lib/data';

export default async function ContactsPage() {
  const contacts = await fetchContacts();

  return (
    <div className='w-full p-4'>
      <ContactsList initialContacts={contacts} />
    </div>
  );
}
