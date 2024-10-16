import axios from "axios";

const api = axios.create({
  baseURL: "https://be-events-platform.onrender.com/api/",
});
export const getAllEvents = () => {
    return api.get(`events`).then((response) => {
        return response.data.events;
      });
}
export const getEventById = (eventId) => {
  console.log(eventId)
  return api.get(`events/${eventId}`).then((response)=>{
    return response.data.event
  })
}