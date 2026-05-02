// import axios from "axios";

// const API = axios.create({
//   baseURL:
//     "https://prenatal-unpleased-unplug.ngrok-free.dev/api",

//   headers: {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": "true"
//   }
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "https://prenatal-unpleased-unplug.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

