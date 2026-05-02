import API from "./axios";

// GET /api/device/all — list all owner's devices
export const fetchDevices = () => API.get("/device/all");

// GET /api/device/:id — single device detail
export const fetchDeviceById = (id) => API.get(`/device/${id}`);

// POST /api/device/register — called by Android agent (Usman)
export const registerDevice = (data) => API.post("/device/register", data);

// POST /api/device/status — background sync from Android agent
export const syncDeviceStatus = (data) => API.post("/device/status", data);

// POST /api/device/enroll — enroll new device
export const enrollDevice = (data) => API.post("/device/enroll", data);

// POST /api/device/:id/command — send command to device
export const sendCommand = (id, command) => API.post(`/device/${id}/command`, { command });

// DELETE /api/device/:id — remove/delete device
export const deleteDevice = (id) => API.delete(`/device/${id}`);

// PUT /api/device/:id — update device details
export const updateDevice = (id, data) => API.put(`/device/${id}`, data);