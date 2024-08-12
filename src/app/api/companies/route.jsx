import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const companies = await prisma.company.findMany()
    return NextResponse.json(companies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Ensure the address is in the correct format
    const { address, ...rest } = data

    const company = await prisma.company.create({
      data: {
        ...rest,
        address: {
          street: address.street,
          street2: address.street2 || null, // Make sure to handle optional fields
          city: address.city,
          state: address.state,
          zip: address.zip
        },
        contactIds: [] // Initialize with an empty array if no contacts are provided
      }
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 })
  }
}
