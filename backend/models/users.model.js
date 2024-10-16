import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";

export const insertNewUser = (user) => {
  const { name, email, staff, password } = user;
  if (!name || !email || !staff || password) {
    return Promise.reject({ status: 400, msg: "content missing from body" });
  }
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    prisma.users
      .create({
        data: {
          name,
          email,
          staff,
          hashedPassword,
        },
      })
      .then((result) => {
        return result;
      });
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
export const loginUser = (body) => {
  const { email, password } = body;

  return prisma.users.findUnique({ where: { email } }).then((userResult) => {
    if (!userResult) {
      return Promise.reject({ status: 400, msg: "Invalid Credentials" });
    }

    return bcrypt
      .compare(password, userResult.password)
      .then((passwordsMatch) => {
        if (!passwordsMatch) {
          return Promise.reject({ status: 400, msg: "Invalid Credentials" });
        }
        return userResult;
      });
  });
};
