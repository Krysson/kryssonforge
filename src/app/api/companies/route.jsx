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
    const companyData = {
      name: data.name,
      companyNumber: data.companyNumber,
      mainPhone: data.mainPhone,
      status: data.status,
      address: data.address,
      createdDate: new Date(data.createdDate),
      updatedDate: new Date(data.updatedDate)
    };

    if (data.mainContactId) {
      companyData.mainContact = { connect: { id: data.mainContactId } };
    }

    if (data.contactIDs && data.contactIDs.length > 0) {
      companyData.contacts = { connect: data.contactIDs.map(id => ({ id })) };
    }

    if (data.userIDs && data.userIDs.length > 0) {
      companyData.users = { connect: data.userIDs.map(id => ({ id })) };
    }

    const company = await prisma.company.create({
      data: companyData,
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
    return NextResponse.json(
      { error: 'Failed to create company', details: error.message },
      { status: 500 }
    );
  }
}
