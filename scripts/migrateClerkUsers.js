// scripts/migrateClerkUsers.js
const { clerkClient, createClerkClient } = require('@clerk/clerk-sdk-node'); // Adjust the import based on the actual library
const { PrismaClient } = require('@prisma/client');

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const prisma = new PrismaClient();

async function migrateUsers() {
  try {
    console.log('Fetching users from Clerk...');
    const usersResponse = await clerk.users.getUserList();
    console.log('Clerk API response:', JSON.stringify(usersResponse, null, 2));

    const users = usersResponse.data;

    if (!Array.isArray(users)) {
      console.error('Expected an array of users, but received:', typeof users);
      return;
    }

    if (users.length === 0) {
      console.log('No users found in Clerk.');
      return;
    }

    console.log(`Found ${users.length} users. Starting migration...`);

    for (const user of users) {
      console.log(`Processing user: ${user.id}`);
      if (!user.emailAddresses || user.emailAddresses.length === 0) {
        console.warn(`User ${user.id} has no email addresses. Skipping.`);
        continue;
      }

      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          emailAddress: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl || '',
          username: user.username || ''
        },
        create: {
          clerkId: user.id,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          emailAddress: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl || '',
          username: user.username || ''
        }
      });
      console.log(`Migrated user: ${user.id}`);
    }
    console.log('User migration completed');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateUsers()
  .then(() => {
    console.log('Migration script finished');
    process.exit(0);
  })
  .catch(error => {
    console.error('Unhandled error in migration script:', error);
    process.exit(1);
  });
