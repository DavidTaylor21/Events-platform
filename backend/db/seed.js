import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";
export const seedDb = () => {
  return prisma.user_events
    .deleteMany({})
    .then(() => prisma.events.deleteMany({}))
    .then(() => prisma.users.deleteMany({}))
    .then(() => {
      const events = [
        {
          event_name: "Winter Wonderland",
          location: "City Center",
          description:
            "Join us for a magical winter experience filled with festive lights, ice skating, and holiday cheer.",
          price: 0.0,
          capacity: 1000,
          start_time: "2024-11-01T16:00:00Z",
          end_time: "2024-12-31T21:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Christmas Market",
          location: "Main Square",
          description:
            "Discover unique gifts and delicious treats at our annual Christmas market.",
          price: 0.0,
          capacity: 500,
          start_time: "2024-11-25T10:00:00Z",
          end_time: "2024-12-24T18:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "New Year's Eve Celebration",
          location: "Riverfront Park",
          description:
            "Ring in the New Year with fireworks, live music, and food stalls.",
          price: 0.0,
          capacity: 2000,
          start_time: "2024-12-31T20:00:00Z",
          end_time: "2025-01-01T01:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Valentine's Day Dinner",
          location: "Skyline Restaurant",
          description:
            "Enjoy a romantic dinner with a stunning view of the city skyline.",
          price: 0.0,
          capacity: 50,
          start_time: "2025-02-14T18:00:00Z",
          end_time: "2025-02-14T22:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Spring Festival",
          location: "Botanical Gardens",
          description:
            "Celebrate the arrival of spring with flowers, food, and fun activities for all ages.",
          price: 0.0,
          capacity: 300,
          start_time: "2025-03-20T10:00:00Z",
          end_time: "2025-03-20T17:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Outdoor Yoga Class",
          location: "City Park",
          description:
            "Relax and rejuvenate with a free outdoor yoga class surrounded by nature.",
          price: 0.0,
          capacity: 40,
          start_time: "2025-04-10T08:00:00Z",
          end_time: "2025-04-10T09:30:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Summer Music Festival",
          location: "Beachfront",
          description:
            "Enjoy live performances from various artists at our annual summer music festival.",
          price: 0.0,
          capacity: 5000,
          start_time: "2025-07-15T15:00:00Z",
          end_time: "2025-07-15T23:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Local Farmers Market",
          location: "Community Park",
          description:
            "Support local farmers and artisans by visiting our weekly farmers market.",
          price: 0.0,
          capacity: 200,
          start_time: "2025-06-05T08:00:00Z",
          end_time: "2025-06-05T12:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Film Festival",
          location: "Cultural Center",
          description:
            "Join us for a week-long film festival showcasing independent films from around the world.",
          price: 0.0,
          capacity: 300,
          start_time: "2025-08-10T10:00:00Z",
          end_time: "2025-08-16T22:00:00Z",
          timeZone: "Europe/London",
        },
        {
          event_name: "Community Clean-Up Day",
          location: "City Streets",
          description:
            "Help us keep our community clean by joining our community clean-up day.",
          price: 0.0,
          capacity: 100,
          start_time: "2025-09-20T09:00:00Z",
          end_time: "2025-09-20T13:00:00Z",
          timeZone: "Europe/London",
        },
      ];
      const eventPromises = events.map((event) => {
        return prisma.events.create({
          data: event,
        });
      });

      return Promise.all(eventPromises);
    })
    .then(() => {
      const newUser = {
        name: "Staff",
        email: "staff@testemail.com",
        staff: true,
        password: "testpassword",
      };

      return bcrypt.hash(newUser.password, 10).then((hashedPassword) => {
        return prisma.users.create({
          data: {
            ...newUser,
            password: hashedPassword,
          },
        });
      });
    })
    .catch((error) => {
      console.error("Error seeding database:", error);
    });
};
seedDb();
