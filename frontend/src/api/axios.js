import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://prenatal-unpleased-unplug.ngrok-free.dev/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
  timeout: 30000, // 30 seconds timeout
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminOrg");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;