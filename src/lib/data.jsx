// lib/data.jsx
import { prisma } from './prismaClient';

export async function fetchContacts() {
  console.log('fetchContacts: Starting function');
  try {
    console.log('fetchContacts: Attempting to fetch contacts...');
    console.log('fetchContacts: prisma object:', prisma);
    console.log('fetchContacts: prisma.contact:', prisma.contact);
    const contacts = await prisma.contact.findMany();
    console.log('fetchContacts: Contacts fetched successfully:', contacts.length);
    return contacts;
  } catch (error) {
    console.error('fetchContacts: Failed to fetch contacts. Error details:', error);
    console.error('fetchContacts: Error name:', error.name);
    console.error('fetchContacts: Error message:', error.message);
    console.error('fetchContacts: Error stack:', error.stack);
    throw new Error('Failed to fetch contacts');
  }
}

export async function fetchCompanies() {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    console.error('Failed to fetch companies:', error);
    throw new Error('Failed to fetch companies');
  }
}
