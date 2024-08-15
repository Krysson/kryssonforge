// Updated seed file (prisma/seed.js) without any relations
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create dummy companies
  await prisma.company.create({
    data: {
      name: 'Acme Corp',
      companyNumber: 'AC001',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      mainPhone: '407-555-1234',
      createdDate: new Date(),
      updatedDate: new Date(),
      status: 'Active'
    }
  });

  await prisma.company.create({
    data: {
      name: 'TechStart Inc',
      companyNumber: 'TS002',
      address: {
        street: '456 Tech Blvd',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '67890'
      },
      mainPhone: '407-555-5678',
      createdDate: new Date(),
      updatedDate: new Date(),
      status: 'Active'
    }
  });
  await prisma.company.create({
    data: {
      name: 'Krysson.Dev LLC',
      companyNumber: 'TS003',
      address: {
        street: '789 Tech Blvd',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '67890'
      },
      mainPhone: '407-555-7890',
      createdDate: new Date(),
      updatedDate: new Date(),
      status: 'Active'
    }
  });

  // Create dummy contacts
  await prisma.contact.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@acme.com',
      phone: '407-555-1111',
      role: 'Manager'
    }
  });

  await prisma.contact.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@techstart.com',
      phone: '407-555-2222',
      role: 'Developer'
    }
  });
  await prisma.contact.create({
    data: {
      firstName: 'Jack',
      lastName: 'Smith',
      email: 'jack@gmail.com',
      phone: '407-555-3333',
      role: 'Project Manager'
    }
  });
  await prisma.contact.create({
    data: {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'Bob@example.com',
      phone: '407-555-4444',
      role: 'Superintendent'
    }
  });

  // Create dummy user
  await prisma.user.create({
    data: {
      clerkId: 'dummy_clerk_id',
      firstName: 'Dummy',
      lastName: 'User',
      username: 'dummyuser',
      emailAddress: 'dummy@example.com',
      imageUrl: 'https://example.com/dummy.jpg'
    }
  });

  // Create dummy project
  await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Redesign company website',
      number: 'P001',
      location: 'Remote',
      generalContractor: 'Web Wizards LLC',
      contractPrice: '50000',
      completionPercentage: 25,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      status: 'In Progress'
    }
  });
  await prisma.project.create({
    data: {
      name: 'KryssonForge Rebase',
      description: 'Redesign company website',
      number: 'P002',
      location: 'Remote',
      generalContractor: 'Krysson.Dev LLC',
      contractPrice: '80000',
      completionPercentage: 65,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 30)),
      status: 'In Progress'
    }
  });

  // Create dummy task
  await prisma.task.create({
    data: {
      title: 'Design Homepage',
      body: 'Create a new design for the homepage',
      status: 'In Progress',
      priority: 'High',
      category: 'Design',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
    }
  });
  await prisma.task.create({
    data: {
      title: 'CRM Application',
      body: 'Create CRM application',
      status: 'In Progress',
      priority: 'High',
      category: 'BUild',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
    }
  });
  await prisma.task.create({
    data: {
      title: 'Create Kanban Board',
      body: 'Design and Create a Kanban board',
      status: 'In Progress',
      priority: 'High',
      category: 'Web Development',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 21))
    }
  });

  // Create dummy file
  await prisma.file.create({
    data: {
      filename: 'homepage_design.psd',
      s3Url: 'https://example-bucket.s3.amazonaws.com/homepage_design.psd',
      fileType: 'application/photoshop',
      description: 'Homepage design file'
    }
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
