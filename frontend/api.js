import axios from "axios";

const api = axios.create({
  baseURL: "https://be-events-platform.onrender.com/",
});
export const getAllEvents = () => {
    return api.get(`events`).then((response) => {
        return response.data.events;
      });
}
