// import API from "./axios";

// export const loginUser = (data) =>
//   API.post("/auth/login", data);

// export const registerUser = (data) =>
//   API.post("/auth/register", data);

import API from "./axios";

// POST /api/auth/register
export const registerUser = (data) => API.post("/auth/register", data);

// POST /api/auth/login
export const loginUser = (data) => API.post("/auth/login", data);

// GET /api/auth/profile  (JWT auto-attached via interceptor)
export const getProfile = () => API.get("/auth/profile");