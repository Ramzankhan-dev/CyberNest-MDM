import API from "./axios";

// POST /api/enrollment/create  — generate enrollment code/QR
export const generateEnrollmentCode = () => API.post("/enrollment/create");