// Import PrismaClient
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertNewEvent = (body) => {
  const { event_name, location, event_time, price, capacity } = body;

  return prisma.events
    .create({
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
  return prisma.events
    .findMany()
    .then((events) => {
      return events;
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw error;
    });
};

export const selectEventById = (id) => {
  return Promise.all([
    prisma.user_events.count({
      where: {
        event_id: id, // Filter by event_id
      },
    }),
    prisma.events.findUnique({
      where: { id },
    }),
  ])
    .then(([bookingCount, event]) => {
      if (!event) {
        throw new Error("Event not found");
      }
      const spacesLeft = event.capacity - bookingCount;
      return {
        ...event,
        spacesLeft, 
      };
    })
    .catch((error) => {
      console.error("Error fetching event by ID:", error);
      throw error;
    });
};

export const insertUserToEvent = (user_id, event_id) => {
  return prisma.user_events
    .create({
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
