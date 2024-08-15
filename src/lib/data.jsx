// lib/data.jsx
import { prisma } from './prismaClient';

export async function fetchContacts() {
  try {
    console.log('Attempting to fetch contacts...');
    const contacts = await prisma.contact.findMany();
    console.log('Contacts fetched successfully:', contacts.length);
    return contacts;
  } catch (error) {
    console.error('Failed to fetch contacts. Error details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
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
