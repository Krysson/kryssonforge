// src/app/api/companies/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        mainContact: true,
        contacts: true,
        projects: true,
        users: true
      }
    });
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const company = await prisma.company.create({
      data: {
        ...data,
        mainContact: { connect: { id: data.mainContactId } },
        contacts: { connect: data.contactIDs.map(id => ({ id })) },
        users: { connect: data.userIDs.map(id => ({ id })) }
      },
      include: {
        mainContact: true,
        contacts: true,
        projects: true,
        users: true
      }
    });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error('Failed to create company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}
