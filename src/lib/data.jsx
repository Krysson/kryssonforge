// lib/data.jsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        company: true,
        projects: true,
        tasks: true,
        mainContactFor: true
      }
    });
    return contacts;
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
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
