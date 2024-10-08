// src/app/api/companies/route.js
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
    const company = await prisma.company.create({
      data
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
