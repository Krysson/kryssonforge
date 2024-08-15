// src/app/api/test-prisma/route.js
import { prisma } from '../../lib/prismaClient';

export default async function handler(req, res) {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        company: true,
        projects: true,
        tasks: true,
        mainContactFor: true
      }
    });
    res.status(200).json({ success: true, count: contacts.length, contacts });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ success: false, error: error.message, stack: error.stack });
  }
}
