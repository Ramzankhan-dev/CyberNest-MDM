import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// export const fetchDevices = () =>
//   API.get("/api/devices");

// export const lockDevice = (deviceId) =>
//   API.post(`/api/devices/${deviceId}/lock`);

// export const rebootDevice = (deviceId) =>
//   API.post(`/api/devices/${deviceId}/reboot`);

// export const wipeDevice = (deviceId) =>
//   API.post(`/api/devices/${deviceId}/wipe`);

// GET /api/device/all  — list all owner's devices
export const fetchDevices = () => API.get("/device/all");

// GET /api/device/:id  — single device detail
export const fetchDeviceById = (id) => API.get(`/device/${id}`);

// POST /api/device/register  — called by Android agent (Usman)
export const registerDevice = (data) => API.post("/device/register", data);

// POST /api/device/status  — background sync from Android agent
export const syncDeviceStatus = (data) => API.post("/device/status", data);