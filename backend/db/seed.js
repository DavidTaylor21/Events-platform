import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcrypt"
export const seedDb = () => {
  return prisma.user_events.deleteMany({})
    .then(() => prisma.events.deleteMany({}))
    .then(() => prisma.users.deleteMany({}))
    .then(() => {
      const events = [
        {
          event_name: "Concert in the Park",
          location: "Hyde Park, London",
          event_time: "2024-07-14T18:00:00.000Z",
          price: "50.00",
          capacity: 1000,
        },
        {
          event_name: "Tech Conference",
          location: "ExCeL London",
          event_time: "2024-08-20T09:00:00.000Z",
          price: "250.00",
          capacity: 5000,
        },
        {
          event_name: "Food Festival",
          location: "Southbank Centre",
          event_time: "2024-09-10T12:00:00.000Z",
          price: "15.00",
          capacity: 3000,
        },
        {
          event_name: "Art Exhibition",
          location: "Tate Modern",
          event_time: "2024-10-01T10:00:00.000Z",
          price: "20.00",
          capacity: 2000,
        },
        {
          event_name: "Stand-Up Comedy Night",
          location: "The Comedy Store",
          event_time: "2024-11-05T20:00:00.000Z",
          price: "30.00",
          capacity: 400,
        },
      ];const eventPromises = events.map(event => {
        return prisma.events.create({
          data: event,
        });
      });

      return Promise.all(eventPromises);
    })
    .then(() => {
      const newUser = {
        name: "David",
        email: "david@fmail.com",
        staff: true,
        password: "password", 
      };

      return bcrypt.hash(newUser.password, 10) 
        .then(hashedPassword => {
          return prisma.users.create({
            data: {
              ...newUser,
              password: hashedPassword, 
            },
          });
        });
    })
    .catch(error => {
      console.error("Error seeding database:", error);
    });
}
seedDb()