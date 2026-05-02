import API from "./axios";

// POST /api/auth/register
export const registerUser = (data) => API.post("/auth/register", data);

// POST /api/auth/login
export const loginUser = (data) => API.post("/auth/login", data);

// GET /api/auth/profile (JWT auto-attached via interceptor)
export const getProfile = () => API.get("/auth/profile");

// POST /api/auth/logout
export const logout = () => API.post("/auth/logout");

// POST /api/auth/verify-otp
export const verifyOtp = (data) => API.post("/auth/verify-otp", data);

// POST /api/auth/forgot-password
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);

// POST /api/auth/reset-password
export const resetPassword = (data) => API.post("/auth/reset-password", data);