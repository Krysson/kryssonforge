// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create companies
  const company1 = await prisma.company.create({
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

  const company2 = await prisma.company.create({
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

  // Create contacts
  const contact1 = await prisma.contact.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@acme.com',
      phone: '407-555-1111',
      role: 'Manager'
    }
  });

  const contact2 = await prisma.contact.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@techstart.com',
      phone: '407-555-2222',
      role: 'Developer'
    }
  });

  const contact3 = await prisma.contact.create({
    data: {
      firstName: 'Jack',
      lastName: 'Johnson',
      email: 'jack@gmail.com',
      phone: '407-555-3333',
      role: 'Project Manager'
    }
  });

  const contact4 = await prisma.contact.create({
    data: {
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob@example.com',
      phone: '407-555-4444',
      role: 'Superintendent'
    }
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      clerkId: 'user_1_clerk_id',
      firstName: 'Alice',
      lastName: 'Johnson',
      username: 'alice_j',
      emailAddress: 'alice@example.com',
      imageUrl: 'https://example.com/alice.jpg'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      clerkId: 'user_2_clerk_id',
      firstName: 'Bob',
      lastName: 'Smith',
      username: 'bob_s',
      emailAddress: 'bob@example.com',
      imageUrl: 'https://example.com/bob.jpg'
    }
  });

  const user3 = await prisma.user.create({
    data: {
      clerkId: 'user_3_clerk_id',
      firstName: 'Charlie',
      lastName: 'Brown',
      username: 'charlie_b',
      emailAddress: 'charlie@example.com',
      imageUrl: 'https://example.com/charlie.jpg'
    }
  });

  // Create projects
  const project1 = await prisma.project.create({
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

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Develop a new mobile app',
      number: 'P002',
      location: 'On-site',
      generalContractor: 'App Innovators Inc',
      contractPrice: '75000',
      completionPercentage: 50,
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 5)),
      status: 'In Progress'
    }
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Data Migration',
      description: 'Migrate data to new system',
      number: 'P003',
      location: 'Remote',
      generalContractor: 'Data Pros LLC',
      contractPrice: '30000',
      completionPercentage: 75,
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: 'In Progress'
    }
  });

  // Create tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Design Homepage',
      body: 'Create a new design for the homepage',
      status: 'In Progress',
      priority: 'High',
      category: 'Design',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      order: 1,
      project: { connect: { id: project1.id } },
      users: { connect: [{ id: user1.id }, { id: user2.id }] }
    }
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Implement User Authentication',
      body: 'Set up user authentication system',
      status: 'Todo',
      priority: 'High',
      category: 'Development',
      startDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      order: 2,
      project: { connect: { id: project1.id } },
      users: { connect: [{ id: user2.id }, { id: user3.id }] }
    }
  });

  const task3 = await prisma.task.create({
    data: {
      title: 'Design App UI',
      body: 'Create user interface designs for the mobile app',
      status: 'In Progress',
      priority: 'Medium',
      category: 'Design',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      order: 1,
      project: { connect: { id: project2.id } },
      users: { connect: [{ id: user1.id }] }
    }
  });

  const task4 = await prisma.task.create({
    data: {
      title: 'Implement Core Functionality',
      body: 'Develop core features of the mobile app',
      status: 'Todo',
      priority: 'High',
      category: 'Development',
      startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      order: 2,
      project: { connect: { id: project2.id } },
      users: { connect: [{ id: user2.id }, { id: user3.id }] }
    }
  });

  const task5 = await prisma.task.create({
    data: {
      title: 'Data Mapping',
      body: 'Map data fields between old and new systems',
      status: 'Done',
      priority: 'High',
      category: 'Analysis',
      startDate: new Date(new Date().setDate(new Date().getDate() - 14)),
      endDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      dueDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      order: 1,
      project: { connect: { id: project3.id } },
      users: { connect: [{ id: user1.id }, { id: user3.id }] }
    }
  });

  const task6 = await prisma.task.create({
    data: {
      title: 'Data Transfer',
      body: 'Execute data transfer between systems',
      status: 'In Progress',
      priority: 'High',
      category: 'Implementation',
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      order: 2,
      project: { connect: { id: project3.id } },
      users: { connect: [{ id: user2.id }, { id: user3.id }] }
    }
  });

  // Create file
  const file1 = await prisma.file.create({
    data: {
      filename: 'project_requirements.pdf',
      s3Url: 'https://example-bucket.s3.amazonaws.com/project_requirements.pdf',
      fileType: 'application/pdf',
      description: 'Project requirements document'
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
