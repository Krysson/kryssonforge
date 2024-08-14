// app/api/projects/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        number: true,
        location: true,
        projectManager: true,
        generalContractor: true,
        contractPrice: true,
        completionPercentage: true,
        startDate: true,
        endDate: true,
        status: true,
        users: {
          select: {
            id: true,
            first_name: true,
            last_name: true
          }
        },
        tasks: {
          select: {
            id: true,
            title: true
          }
        },
        company: {
          select: {
            id: true,
            name: true
          }
        },
        contacts: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
// POST Function

export async function POST(request) {
  try {
    const data = await request.json()

    if (!data.companyId) {
      return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        number: data.number,
        location: data.location,
        projectManager: data.projectManager,
        generalContractor: data.generalContractor,
        contractPrice: data.contractPrice,
        completionPercentage: data.completionPercentage,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status,
        company: { connect: { id: data.companyId } },
        users: { connect: data.userIds ? data.userIds.map(id => ({ id })) : [] },
        contacts: { connect: data.contactIds ? data.contactIds.map(id => ({ id })) : [] }
      }
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project', details: error.message },
      { status: 500 }
    )
  }
}
