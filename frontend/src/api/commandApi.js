
// import API from "./axios";

// /**
//  * POST /api/command/send
//  * command_type: "LOCK" | "UNLOCK" | "LOCATION" | "MESSAGE"
//  *
//  * Example:
//  *   sendCommand({ device_id: "ANDROID_001", command_type: "LOCK", command_message: "Locked by admin" })
//  */
// export const sendCommand = (data) => API.post("/command/send", data);

// // Get all devices (for command center)
// export const getAllDevices = () => API.get("/device/all");

// // Helpers for common commands (single device)
// export const lockDevice = (device_id) =>
//   sendCommand({ device_id, command_type: "LOCK", command_message: "Device locked by CyberNest" });

// export const unlockDevice = (device_id) =>
//   sendCommand({ device_id, command_type: "UNLOCK", command_message: "Device unlocked by CyberNest" });

// export const locateDevice = (device_id) =>
//   sendCommand({ device_id, command_type: "LOCATION", command_message: "Send current location" });

// export const messageDevice = (device_id, command_message = "Contact Admin") =>
//   sendCommand({ device_id, command_type: "MESSAGE", command_message });

// // Bulk command helpers (for multiple devices)
// export const bulkLockDevices = async (deviceIds, message = "Device locked by CyberNest") => {
//   const promises = deviceIds.map(device_id =>
//     sendCommand({ device_id, command_type: "LOCK", command_message: message })
//   );
//   return Promise.allSettled(promises);
// };

// export const bulkUnlockDevices = async (deviceIds, message = "Device unlocked by CyberNest") => {
//   const promises = deviceIds.map(device_id =>
//     sendCommand({ device_id, command_type: "UNLOCK", command_message: message })
//   );
//   return Promise.allSettled(promises);
// };

// export const bulkLocateDevices = async (deviceIds, message = "Send current location") => {
//   const promises = deviceIds.map(device_id =>
//     sendCommand({ device_id, command_type: "LOCATION", command_message: message })
//   );
//   return Promise.allSettled(promises);
// };

// export const bulkMessageDevices = async (deviceIds, command_message) => {
//   const promises = deviceIds.map(device_id =>
//     sendCommand({ device_id, command_type: "MESSAGE", command_message })
//   );
//   return Promise.allSettled(promises);
// };

// // Generic bulk command function
// export const sendBulkCommand = async (deviceIds, commandType, commandMessage = "") => {
//   let message = commandMessage;
  
//   // Set default messages if not provided
//   if (!message) {
//     switch (commandType) {
//       case "LOCK":
//         message = "Device locked by CyberNest";
//         break;
//       case "UNLOCK":
//         message = "Device unlocked by CyberNest";
//         break;
//       case "LOCATION":
//         message = "Send current location";
//         break;
//       case "MESSAGE":
//         message = "Admin message";
//         break;
//       default:
//         message = "";
//     }
//   }
  
//   const promises = deviceIds.map(device_id =>
//     sendCommand({ device_id, command_type: commandType, command_message: message })
//   );
  
//   return Promise.allSettled(promises);
// };

// // Get command status for a device (if your backend supports it)
// export const getCommandStatus = (deviceId) => API.get(`/command/status/${deviceId}`);

// // Get command history for a device (if your backend supports it)
// export const getCommandHistory = (deviceId, limit = 50) => 
//   API.get(`/command/history/${deviceId}?limit=${limit}`);


import API from "./axios";

/**
 * POST /api/command/send
 * command_type: "LOCK" | "UNLOCK" | "LOCATION" | "MESSAGE"
 */
export const sendCommand = (data) => API.post("/command/send", data);

// Get all devices (for command center)
export const getAllDevices = () => API.get("/device/all");

// Helper functions for single device commands
export const lockDevice = (device_id, command_message = "Device locked by CyberNest") =>
  sendCommand({ device_id, command_type: "LOCK", command_message });

export const unlockDevice = (device_id, command_message = "Device unlocked by CyberNest") =>
  sendCommand({ device_id, command_type: "UNLOCK", command_message });

export const locateDevice = (device_id, command_message = "Send current location") =>
  sendCommand({ device_id, command_type: "LOCATION", command_message });

export const messageDevice = (device_id, command_message = "Contact Admin") =>
  sendCommand({ device_id, command_type: "MESSAGE", command_message });

// Helper function to check if response indicates success
export const isCommandSuccess = (response) => {
  if (!response) return false;
  // Check HTTP status
  if (response.status === 200 || response.status === 201) return true;
  // Check response body
  if (response.data) {
    if (response.data.success === true) return true;
    if (response.data.status === "success") return true;
  }
  return false;
};