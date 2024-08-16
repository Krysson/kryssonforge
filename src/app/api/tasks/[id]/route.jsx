// src/app/api/tasks/[id]/route.jsx
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status: data.status,
        order: data.order,
        title: data.title,
        body: data.body,
        priority: data.priority,
        category: data.category,
        startDate: data.startDate,
        endDate: data.endDate,
        dueDate: data.dueDate,
        projectId: data.projectId
      }
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Failed to update task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true }
    });
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    console.error('Failed to fetch task:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.task.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Failed to delete task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
