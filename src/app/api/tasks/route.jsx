// src/app/api/tasks/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        users: true
      },
      orderBy: [{ status: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }]
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const task = await prisma.task.create({
      data: {
        title: data.title,
        body: data.body,
        status: data.status,
        priority: data.priority,
        category: data.category,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        dueDate: new Date(data.dueDate),
        order: data.order,
        project: data.projectId ? { connect: { id: data.projectId } } : undefined,
        users: {
          connect: data.userIds.map(id => ({ id }))
        }
      },
      include: {
        project: true,
        users: true
      }
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
