// src/app/api/contacts/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log('GET /api/contacts: Starting request');
  try {
    const contacts = await prisma.contact.findMany();

    console.log('GET /api/contacts: Fetched contacts', contacts);

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('GET /api/contacts: Failed to fetch contacts:', error);

    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const contact = await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role
      }
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Failed to create contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        role: data.role
      }
    });
    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.contact.delete({ where: { id } });
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
