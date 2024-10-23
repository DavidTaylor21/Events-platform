// Import PrismaClient
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertNewEvent = (body) => {
  const { event_name, location, event_time, price, capacity } = body;
  if (!event_name || !location || !event_time || !price || !capacity) {
    return Promise.reject({ status: 400, msg: "content missing from body" });
  }

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
    });
};

export const selectAllEvents = () => {
  return prisma.events.findMany().then((events) => {
    return events;
  });
};

export const selectEventById = (id) => {
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const eventId = parseInt(id, 10);

  return Promise.all([
    prisma.user_events.count({
      where: {
        event_id: eventId,
      },
    }),
    prisma.events.findUnique({
      where: { id: eventId },
    }),
  ]).then(([bookingCount, event]) => {
    if (!event) {
      return Promise.reject({ status: 404, msg: "article not found" });
    }
    const spacesLeft = event.capacity - bookingCount;
    return {
      ...event,
      spacesLeft,
    };
  });
};

export const insertUserToEvent = (user_id, event_id) => {
  return prisma.events
    .findUnique({
      where: {
        id: event_id,
      },
    })
    .then((event) => {
      if (!event) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }

      return prisma.user_events.create({
        data: {
          user_id,
          event_id,
        },
      });
    });
};

export const editEvent = (eventId, body) => {
  return prisma.events
    .findUnique({
      where: {
        id: eventId,
      },
    })
    .then((event) => {
      if (!event) {
        return Promise.reject({ status: 404, msg: "Event not found" });
      }

      return prisma.events.update({
        where: { id: eventId },
        data: body,
      });
    });
};
export const deleteEventById = (eventId) => {
  const id = parseInt(eventId, 10);
  return prisma.events.delete({ where: { id } }).then((result) => {
    return result;
  }).catch((err)=>{
    console.log(err)
  })
};
