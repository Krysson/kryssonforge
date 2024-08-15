// @/lib/actions/user.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
        emailAddress: email_addresses[0].email_address,
        username: username
      },
      create: {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
        emailAddress: email_addresses[0].email_address,
        username: username
      }
    });

    return user;
  } catch (error) {
    console.log('Error creating or updating user:', error);
    throw error;
  }
};

export const deleteUser = async id => {
  try {
    await prisma.user.delete({ where: { clerkId: id } });
  } catch (error) {
    console.log('Error deleting user:', error);
    throw error;
  }
};
