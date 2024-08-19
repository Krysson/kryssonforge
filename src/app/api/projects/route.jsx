// src/app/api/projects/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        number: true,
        generalContractor: true,
        completionPercentage: true
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        number: data.number,
        location: data.location,
        generalContractor: data.generalContractor,
        contractPrice: data.contractPrice,
        completionPercentage: data.completionPercentage,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status
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
        name: data.name,
        description: data.description,
        number: data.number,
        location: data.location,
        generalContractor: data.generalContractor,
        contractPrice: data.contractPrice,
        completionPercentage: data.completionPercentage,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status
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
    await prisma.project.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Failed to delete project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
