// src/app/api/projects/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        projectManager: true,
        users: true,
        tasks: true,
        company: true,
        contacts: true,
        files: true
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        ...data,
        projectManager: { connect: { id: data.projectManagerId } },
        company: { connect: { id: data.companyId } },
        users: { connect: data.userIDs.map(id => ({ id })) },
        contacts: { connect: data.contactIDs.map(id => ({ id })) }
      },
      include: {
        projectManager: true,
        users: true,
        tasks: true,
        company: true,
        contacts: true,
        files: true
      }
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        users: { set: data.userIDs.map(id => ({ id })) },
        contacts: { set: data.contactIDs.map(id => ({ id })) }
      },
      include: {
        projectManager: true,
        users: true,
        tasks: true,
        company: true,
        contacts: true,
        files: true
      }
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
