const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

interface Venue {
  name: string;
  city: { name: string };
  country: { name: string };
}

interface EventDate {
  start: {
    localDate: string;
    localTime: string;
  };
}

interface PriceRange {
  max: number;
}

interface Event {
  name: string;
  url: string; // URL for event
  dates: EventDate;
  priceRanges: PriceRange[];
  _embedded: {
    venues: Venue[];
  };
}

interface MappedEvent {
  eventName: string;
  eventLocation: string;
  eventTime: string;
  price: number;
  capacity: number;
}

export async function getEventsInLondon(): Promise<MappedEvent[]> {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json`;

  try {
    const response = await axios.get(url, {
      params: {
        locale: "en-GB",
        city: "london",
        apikey: TICKETMASTER_API_KEY,
        size: "10",
      },
    });

    const events = response.data._embedded?.events || [];

    return events.map((event: Event): MappedEvent => {
      const eventPrice = event.priceRanges ? event.priceRanges[0].max : 0;

      return {
        eventName: event.name,
        eventLocation: event._embedded.venues
          ? `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].country.name}`
          : "Location not available",
        eventTime: `${event.dates.start.localDate} ${event.dates.start.localTime}`,
        price: parseFloat(eventPrice.toFixed(2)),
        capacity: Math.floor(Math.random() * 100) + 1,
      };
    });
  } catch (error) {
    const err = error as any;
    console.error("Error fetching events:", err.response?.data || err.message);
    throw err;
  }
}
