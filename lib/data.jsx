import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function fetchContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        companies: true,
        projects: true
      }
    })
    return contacts
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    return []
  }
}
export async function fetchCompanies() {
  try {
    const companies = await prisma.company.findMany()
    return companies
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    return []
  }
}
