import axios from "axios";

const api = axios.create({
  baseURL: "https://be-events-platform.onrender.com/api/",
});
export const getAllEvents = () => {
  return api.get(`events`).then((response) => {
    return response.data.events;
  });
};
export const getEventById = (eventId) => {
  return api.get(`events/${eventId}`).then((response) => {
    return response.data.event;
  });
};
export const userLogin = (email, password) => {
  const loginDetails = { email, password };
  console.log("api login")
  return api.post("users/login", loginDetails).then((userData) => {
    return userData.data.user;
  })
};
export const userRegister = (name, email, password) => {
  const userDetails = { name, email, staff: false, password };
  return api.post("users/register", userDetails).then((userData) => {
    return userData.data.user;
  })
};
export const signUpForEvent = (userId, eventId) => {
  return api.post(`events/${eventId}/register`, {user_id:userId}).then((response)=>{
    return response.data
  })
}
