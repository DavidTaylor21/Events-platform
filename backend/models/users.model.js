import prisma from '../prisma/prismaClient.js'

export const insertNewUser = (user) => {
  const { name, email, phone_number, staff } = user;
  return prisma.users
    .create({
      data: {
        name,
        email,
        phone_number,
        staff,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error("Error inserting new user: " + error);
    });
};
