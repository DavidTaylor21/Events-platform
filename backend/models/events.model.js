// Import PrismaClient
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertNewEvent = (body) => {
  const { event_name, location, description, start_time, end_time, price, capacity, timeZone } = body;

  if (!event_name || !location || !start_time || !end_time || !timeZone) {
    return Promise.reject({ status: 400, msg: "Required content missing from body" });
  }

  if (new Date(start_time) >= new Date(end_time)) {
    return Promise.reject({ status: 400, msg: "Start time must be before end time" });
  }

  const parsedPrice = price ? parseFloat(price) : null;
  const parsedCapacity = capacity ? parseInt(capacity, 10) : null;

  return prisma.events
    .create({
      data: {
        event_name,
        location,
        description,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        price: parsedPrice,
        capacity: parsedCapacity,
        timeZone,
      },
    })
    .then((newEvent) => {
      return newEvent;
    })
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

  return prisma.user_events
    .deleteMany({
      where: { event_id: id },
    })
    .then(() => {
      return prisma.events.delete({ where: { id } });
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error("Error deleting event:", err);
      throw err;
    });
};
