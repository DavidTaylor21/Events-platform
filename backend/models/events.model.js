// Import PrismaClient
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertNewEvent = (body) => {
  const { event_name, location, event_time, price, capacity } = body;

  return prisma.events.create({
    data: {
      event_name,
      location,
      event_time,
      price,
      capacity,
    },
  })
  .then((newEvent) => {
    return newEvent;
  })
  .catch((error) => {
    throw new Error("Error inserting new event: " + error.message);
  });
};

export const selectAllEvents = () => {
  return prisma.events.findMany()
    .then((events) => {
      return events;
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw error;
    });
};

export const selectEventById = (id) => {
  return prisma.events.findUnique({
    where: { id },
  })
  .then((event) => {
    return event;
  })
  .catch((error) => {
    console.error("Error fetching event by ID:", error);
    throw error;
  });
};


export const insertUserToEvent = (user_id, event_id) => {
  return prisma.user_events.create({
    data: {
      user_id,
      event_id,
    },
  })
  .then((userEvent) => {
    return userEvent;
  })
  .catch((error) => {
    console.error("Error inserting user to event:", error);
    throw error;
  });
};
