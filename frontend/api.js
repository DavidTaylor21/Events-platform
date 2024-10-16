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
  return api.get(`events/${eventId}`).then((response)=>{
    return response.data.event
  })
}
export const userLogin = (email, password) => {
  console.log("api call", "email: " + email, "password: "+ password)
  const loginDetails = {email, password}
  console.log(loginDetails)
  return api.post('users/login', loginDetails).then((userData)=>{
    console.log(userData)
    return userData.data.user
  })
}