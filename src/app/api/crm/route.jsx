// src/app/api/crm/route.jsx

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        contacts: true
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
    const companyData = {
      name: data.name,
      companyNumber: data.companyNumber,
      mainPhone: data.mainPhone,
      status: data.status,
      contacts: {
        create: data.contacts
      }
    };

    const company = await prisma.company.create({
      data: companyData,
      include: {
        contacts: true
      }
    });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error('Failed to create company:', error);
    return NextResponse.json(
      { error: 'Failed to create company', details: error.message },
      { status: 500 }
    );
  }
}
