import axios from "axios";

const API = axios.create({
  baseURL:
    "https://prenatal-unpleased-unplug.ngrok-free.dev/api",

  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  }
});

export default API;