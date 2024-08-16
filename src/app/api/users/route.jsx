// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        clerkId: true,
        firstName: true,
        lastName: true,
        username: true,
        emailAddress: true,
        imageUrl: true,
        tasks: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        emailAddress: data.emailAddress,
        imageUrl: data.imageUrl,
        tasks: { connect: data.taskIDs?.map(id => ({ id })) || [] }
      },
      include: {
        tasks: true
      }
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        emailAddress: data.emailAddress,
        imageUrl: data.imageUrl,
        tasks: data.taskIDs ? { set: data.taskIDs.map(id => ({ id })) } : undefined
      },
      include: {
        tasks: true
      }
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
