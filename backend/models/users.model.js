import prisma from "../prisma/prismaClient.js";

export const insertNewUser = (user) => {
  const { name, email, phone_number, staff } = user;
  if (!name || !email || !phone_number || !staff) {
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
    });
};
export const editUser = (userId, body) => {
  return prisma.users
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }

      return prisma.users.update({
        where: { id: userId },
        data: body,
      });
    });
};
export const fetchUserById = (id) => {
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Invalid user ID" });
  }
  const userId = parseInt(id, 10);
  return prisma.users.findUnique({ where: { id: userId } });
};
export const getUserEvents = (userId) => {
  return prisma.users
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }
      return prisma.user_events
        .findMany({
          where: {
            user_id: userId,
          },
          include: {
            event: true,
          },
        })
        .then((userEvents) => {
          return userEvents.map((userEvent) => userEvent.event);
        });
    });
};
