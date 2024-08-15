// src/app/api/contacts/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        company: true,
        projects: true,
        tasks: true,
        mainContactFor: true
      }
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
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
        role: data.role,
        company: { connect: { id: data.companyId } },
        projects: { connect: data.projectIDs?.map(id => ({ id })) || [] },
        tasks: { connect: data.taskIDs?.map(id => ({ id })) || [] }
      },
      include: {
        company: true,
        projects: true,
        tasks: true,
        mainContactFor: true
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
        role: data.role,
        company: data.companyId ? { connect: { id: data.companyId } } : undefined,
        projects: data.projectIDs ? { set: data.projectIDs.map(id => ({ id })) } : undefined,
        tasks: data.taskIDs ? { set: data.taskIDs.map(id => ({ id })) } : undefined
      },
      include: {
        company: true,
        projects: true,
        tasks: true,
        mainContactFor: true
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
