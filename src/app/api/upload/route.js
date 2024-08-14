import { NextResponse } from 'next/server'
import { uploadFile } from '../../../lib/s3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')
  const projectId = formData.get('projectId') // Assuming projectId is provided
  const key = `${projectId}/${file.name}`

  try {
    // Upload file to S3
    const result = await uploadFile(file, key)

    // Store file metadata in MongoDB
    await prisma.file.create({
      data: {
        filename: file.name,
        projectId: projectId,
        s3Url: result.Location,
        fileType: file.type,
        description: formData.get('description') || '' // Optional metadata
      }
    })

    return NextResponse.json({ url: result.Location }, { status: 200 })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}
