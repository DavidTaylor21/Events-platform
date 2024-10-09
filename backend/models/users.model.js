import prisma from '../prisma/prismaClient.js'

export const insertNewUser = (user) => {
  const { name, email, phone_number, staff } = user;
  if (!name || !email || !phone_number || !staff ) {
    return Promise.reject({ status: 400, msg: "content missing from body" });
  }
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
};
