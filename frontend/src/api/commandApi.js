import API from "./axios";

/**
 * POST /api/command/send
 * command_type: "LOCK" | "UNLOCK" | "LOCATION" | "MESSAGE"
 *
 * Example:
 *   sendCommand({ device_id: "ANDROID_001", command_type: "LOCK", command_message: "Locked by admin" })
 */
export const sendCommand = (data) => API.post("/command/send", data);

// Helpers for common commands
export const lockDevice = (device_id) =>
  sendCommand({ device_id, command_type: "LOCK", command_message: "Device locked by CyberNest" });

export const unlockDevice = (device_id) =>
  sendCommand({ device_id, command_type: "UNLOCK", command_message: "Device unlocked by CyberNest" });

export const locateDevice = (device_id) =>
  sendCommand({ device_id, command_type: "LOCATION", command_message: "Send current location" });

export const messageDevice = (device_id, command_message = "Contact Admin") =>
  sendCommand({ device_id, command_type: "MESSAGE", command_message });