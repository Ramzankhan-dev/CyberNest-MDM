
// import React from "react";
// import { Lock, Unlock, MapPin, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
// import CommandStatusBadge from "./CommandStatusBadge";

// const C = {
//   bg800: "#1e293b",
//   border800: "#1e293b",
//   border700: "#334155",
//   text50: "#f8fafc",
//   text300: "#cbd5e1",
//   text400: "#94a3b8",
//   text500: "#64748b",
//   emerald400: "#34d399",
//   red400: "#f87171",
//   yellow400: "#facc15",
//   cyan400: "#22d3ee"
// };

// const StatusDot = ({ status }) => {
//   const color = status ? C.emerald400 : C.red400;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
//       <div style={{
//         width: 6,
//         height: 6,
//         borderRadius: "50%",
//         backgroundColor: color,
//         boxShadow: status ? `0 0 6px ${color}` : "none"
//       }} />
//       <span style={{ fontSize: "0.75rem", color: C.text400 }}>
//         {status ? "Online" : "Offline"}
//       </span>
//     </div>
//   );
// };

// const BatteryIndicator = ({ level }) => {
//   const getColor = () => {
//     if (level < 20) return C.red400;
//     if (level < 50) return C.yellow400;
//     return C.emerald400;
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//       <div style={{
//         flex: 1,
//         height: 4,
//         backgroundColor: C.bg800,
//         borderRadius: 2,
//         overflow: "hidden",
//         width: "50px"
//       }}>
//         <div style={{
//           width: `${level}%`,
//           height: "100%",
//           backgroundColor: getColor(),
//           borderRadius: 2
//         }} />
//       </div>
//       <span style={{ fontSize: "0.75rem", color: C.text400 }}>{level}%</span>
//     </div>
//   );
// };

// const ActionButton = ({ icon: Icon, onClick, disabled, color, title, loading, success }) => {
//   if (loading) {
//     return (
//       <div style={{
//         padding: "0.375rem",
//         backgroundColor: `${color}10`,
//         border: `1px solid ${color}30`,
//         borderRadius: "6px",
//         display: "inline-flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}>
//         <Loader2 size={14} color={color} style={{ animation: "spin 1s linear infinite" }} />
//       </div>
//     );
//   }

//   if (success) {
//     return (
//       <div style={{
//         padding: "0.375rem",
//         backgroundColor: `${C.emerald400}20`,
//         border: `1px solid ${C.emerald400}`,
//         borderRadius: "6px",
//         display: "inline-flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}>
//         <CheckCircle2 size={14} color={C.emerald400} />
//       </div>
//     );
//   }

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       title={title}
//       style={{
//         padding: "0.375rem",
//         backgroundColor: `${color}10`,
//         border: `1px solid ${color}30`,
//         borderRadius: "6px",
//         color: color,
//         cursor: disabled ? "not-allowed" : "pointer",
//         opacity: disabled ? 0.4 : 1,
//         transition: "all 0.2s",
//         display: "inline-flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//       onMouseEnter={(e) => {
//         if (!disabled) {
//           e.currentTarget.style.transform = "scale(1.05)";
//           e.currentTarget.style.backgroundColor = `${color}20`;
//         }
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "";
//         e.currentTarget.style.backgroundColor = `${color}10`;
//       }}
//     >
//       <Icon size={14} />
//     </button>
//   );
// };

// const CommandTable = ({ 
//   devices, 
//   selectedDevices, 
//   onSelectDevice, 
//   onSelectAll,
//   onCommand,
//   loadingCommands,
//   commandStatuses = {},
//   successStates = {},
//   searchTerm
// }) => {
//   const allSelected = devices.length > 0 && selectedDevices.size === devices.length;

//   return (
//     <div style={{
//       backgroundColor: C.bg800,
//       border: `1px solid ${C.border800}`,
//       borderRadius: "12px",
//       overflow: "auto"
//     }}>
//       <table style={{
//         width: "100%",
//         borderCollapse: "collapse",
//         minWidth: "1000px"
//       }}>
//         <thead>
//           <tr style={{
//             borderBottom: `1px solid ${C.border800}`,
//             backgroundColor: "rgba(15, 23, 42, 0.5)"
//           }}>
//             <th style={{ width: "40px", padding: "0.875rem 0.5rem" }}>
//               <input
//                 type="checkbox"
//                 checked={allSelected}
//                 onChange={(e) => onSelectAll(e.target.checked)}
//                 style={{
//                   width: 16,
//                   height: 16,
//                   cursor: "pointer",
//                   accentColor: C.emerald400
//                 }}
//               />
//             </th>
//             <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
//               Device Name
//             </th>
//             <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
//               Device ID
//             </th>
//             <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
//               Status
//             </th>
//             <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
//               Battery
//             </th>
//             <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
//               Command Status
//             </th>
//             <th style={{ textAlign: "center", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
//               Actions
//             </th>
//            </tr>
//         </thead>
//         <tbody>
//           {devices.map((device, index) => {
//             const deviceId = device.device_id || device.id;
//             const isSelected = selectedDevices.has(deviceId);
//             const isLoading = loadingCommands[deviceId];
//             const commandStatus = commandStatuses[deviceId] || "No Command";
            
//             return (
//               <tr
//                 key={device.id || deviceId}
//                 data-device-id={deviceId}
//                 style={{
//                   borderBottom: index < devices.length - 1 ? `1px solid ${C.border800}` : "none",
//                   backgroundColor: isSelected ? "rgba(34, 211, 238, 0.05)" : "transparent",
//                   transition: "background-color 0.3s"
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.4)";
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
//                 }}
//               >
//                 <td style={{ padding: "1rem 0.5rem", textAlign: "center" }}>
//                   <input
//                     type="checkbox"
//                     checked={isSelected}
//                     onChange={() => onSelectDevice(deviceId)}
//                     style={{
//                       width: 16,
//                       height: 16,
//                       cursor: "pointer",
//                       accentColor: C.emerald400
//                     }}
//                   />
//                  </td>
//                 <td style={{ padding: "1rem" }}>
//                   <div>
//                     <div style={{ fontSize: "0.85rem", fontWeight: 500, color: C.text300 }}>
//                       {device.device_name || "Unknown Device"}
//                     </div>
//                     <div style={{ fontSize: "0.65rem", color: C.text500, marginTop: "0.25rem" }}>
//                       v{device.android_version || "—"}
//                     </div>
//                   </div>
//                  </td>
//                 <td style={{ padding: "1rem" }}>
//                   <code style={{
//                     fontSize: "0.75rem",
//                     color: C.text400,
//                     fontFamily: "monospace"
//                   }}>
//                     {deviceId}
//                   </code>
//                  </td>
//                 <td style={{ padding: "1rem" }}>
//                   <StatusDot status={device.is_online} />
//                  </td>
//                 <td style={{ padding: "1rem", minWidth: "100px" }}>
//                   <BatteryIndicator level={device.battery_level || 0} />
//                  </td>
//                 <td style={{ padding: "1rem" }}>
//                   <CommandStatusBadge status={commandStatus} />
//                  </td>
//                 <td style={{ padding: "1rem" }}>
//                   <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
//                     <ActionButton
//                       icon={Lock}
//                       onClick={() => onCommand(deviceId, "LOCK")}
//                       disabled={!device.is_online || isLoading}
//                       loading={isLoading === "LOCK"}
//                       success={successStates[`${deviceId}-LOCK`]}
//                       color={C.red400}
//                       title="Lock Device"
//                     />
//                     <ActionButton
//                       icon={Unlock}
//                       onClick={() => onCommand(deviceId, "UNLOCK")}
//                       disabled={!device.is_online || isLoading}
//                       loading={isLoading === "UNLOCK"}
//                       success={successStates[`${deviceId}-UNLOCK`]}
//                       color={C.emerald400}
//                       title="Unlock Device"
//                     />
//                     <ActionButton
//                       icon={MapPin}
//                       onClick={() => onCommand(deviceId, "LOCATION")}
//                       disabled={!device.is_online || isLoading}
//                       loading={isLoading === "LOCATION"}
//                       success={successStates[`${deviceId}-LOCATION`]}
//                       color={C.yellow400}
//                       title="Get Location"
//                     />
//                     <ActionButton
//                       icon={MessageSquare}
//                       onClick={() => onCommand(deviceId, "MESSAGE")}
//                       disabled={!device.is_online || isLoading}
//                       loading={isLoading === "MESSAGE"}
//                       success={successStates[`${deviceId}-MESSAGE`]}
//                       color={C.cyan400}
//                       title="Send Message"
//                     />
//                   </div>
//                  </td>
//                </tr>
//             );
//           })}
//         </tbody>
//        </table>
      
//       {devices.length === 0 && (
//         <div style={{
//           padding: "3rem",
//           textAlign: "center",
//           color: C.text500
//         }}>
//           No devices found
//         </div>
//       )}

//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CommandTable;

import React from "react";
import { Lock, Unlock, MapPin, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import CommandStatusBadge from "./CommandStatusBadge";

const C = {
  bg800: "#1e293b",
  border800: "#1e293b",
  border700: "#334155",
  text50: "#f8fafc",
  text300: "#cbd5e1",
  text400: "#94a3b8",
  text500: "#64748b",
  emerald400: "#34d399",
  red400: "#f87171",
  yellow400: "#facc15",
  cyan400: "#22d3ee"
};

const StatusDot = ({ status }) => {
  const color = status ? C.emerald400 : C.red400;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
      <div style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: status ? `0 0 6px ${color}` : "none"
      }} />
      <span style={{ fontSize: "0.75rem", color: C.text400 }}>
        {status ? "Online" : "Offline"}
      </span>
    </div>
  );
};

const BatteryIndicator = ({ level }) => {
  const getColor = () => {
    if (level < 20) return C.red400;
    if (level < 50) return C.yellow400;
    return C.emerald400;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{
        flex: 1,
        height: 4,
        backgroundColor: C.bg800,
        borderRadius: 2,
        overflow: "hidden",
        width: "50px"
      }}>
        <div style={{
          width: `${level}%`,
          height: "100%",
          backgroundColor: getColor(),
          borderRadius: 2
        }} />
      </div>
      <span style={{ fontSize: "0.75rem", color: C.text400 }}>{level}%</span>
    </div>
  );
};

const ActionButton = ({ icon: Icon, onClick, disabled, color, title, loading, success }) => {
  if (loading) {
    return (
      <div style={{
        padding: "0.375rem",
        backgroundColor: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: "6px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Loader2 size={14} color={color} style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (success) {
    return (
      <div style={{
        padding: "0.375rem",
        backgroundColor: `${C.emerald400}20`,
        border: `1px solid ${C.emerald400}`,
        borderRadius: "6px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeOut 1.5s ease forwards"
      }}>
        <CheckCircle2 size={14} color={C.emerald400} />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        padding: "0.375rem",
        backgroundColor: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: "6px",
        color: color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.2s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.backgroundColor = `${color}20`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.backgroundColor = `${color}10`;
      }}
    >
      <Icon size={14} />
    </button>
  );
};

const CommandTable = ({ 
  devices, 
  selectedDevices, 
  onSelectDevice, 
  onSelectAll,
  onCommand,
  loadingCommands,
  commandStatuses = {},
  successStates = {},
  onDeviceSelect
}) => {
  const allSelected = devices.length > 0 && selectedDevices.size === devices.length;

  const handleRowClick = (deviceId) => {
    if (onDeviceSelect) {
      onDeviceSelect(deviceId);
    }
  };

  const isRowSelected = (deviceId) => {
    return selectedDevices.has(deviceId);
  };

  return (
    <div style={{
      backgroundColor: C.bg800,
      border: `1px solid ${C.border800}`,
      borderRadius: "12px",
      overflow: "auto"
    }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "1000px"
      }}>
        <thead>
          <tr style={{
            borderBottom: `1px solid ${C.border800}`,
            backgroundColor: "rgba(15, 23, 42, 0.5)"
          }}>
            <th style={{ width: "40px", padding: "0.875rem 0.5rem" }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                style={{
                  width: 16,
                  height: 16,
                  cursor: "pointer",
                  accentColor: C.emerald400
                }}
              />
            </th>
            <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
              Device Name
            </th>
            <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
              Device ID
            </th>
            <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
              Status
            </th>
            <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
              Battery
            </th>
            <th style={{ textAlign: "left", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
              Command Status
            </th>
            <th style={{ textAlign: "center", padding: "0.875rem 1rem", fontSize: "0.7rem", fontWeight: 600, color: C.text500, textTransform: "uppercase" }}>
              Actions
            </th>
           </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => {
            const deviceId = device.device_id || device.id;
            const isSelected = isRowSelected(deviceId);
            const isLoading = loadingCommands[deviceId];
            const commandStatus = commandStatuses[deviceId] || "No Command";
            
            return (
              <tr
                key={device.id || deviceId}
                data-device-id={deviceId}
                onClick={() => handleRowClick(deviceId)}
                style={{
                  borderBottom: index < devices.length - 1 ? `1px solid ${C.border800}` : "none",
                  backgroundColor: isSelected ? "rgba(34, 211, 238, 0.1)" : "transparent",
                  transition: "background-color 0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.4)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <td style={{ padding: "1rem 0.5rem", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectDevice(deviceId)}
                    style={{
                      width: 16,
                      height: 16,
                      cursor: "pointer",
                      accentColor: C.emerald400
                    }}
                  />
                 </td>
                <td style={{ padding: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: C.text300 }}>
                      {device.device_name || "Unknown Device"}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: C.text500, marginTop: "0.25rem" }}>
                      v{device.android_version || "—"}
                    </div>
                  </div>
                 </td>
                <td style={{ padding: "1rem" }}>
                  <code style={{
                    fontSize: "0.75rem",
                    color: C.text400,
                    fontFamily: "monospace"
                  }}>
                    {deviceId}
                  </code>
                 </td>
                <td style={{ padding: "1rem" }}>
                  <StatusDot status={device.is_online} />
                 </td>
                <td style={{ padding: "1rem", minWidth: "100px" }}>
                  <BatteryIndicator level={device.battery_level || 0} />
                 </td>
                <td style={{ padding: "1rem" }}>
                  <CommandStatusBadge status={commandStatus} />
                 </td>
                <td style={{ padding: "1rem" }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                    <ActionButton
                      icon={Lock}
                      onClick={() => onCommand(deviceId, "LOCK")}
                      disabled={!device.is_online || isLoading}
                      loading={isLoading === "LOCK"}
                      success={successStates[`${deviceId}-LOCK`]}
                      color={C.red400}
                      title="Lock Device"
                    />
                    <ActionButton
                      icon={Unlock}
                      onClick={() => onCommand(deviceId, "UNLOCK")}
                      disabled={!device.is_online || isLoading}
                      loading={isLoading === "UNLOCK"}
                      success={successStates[`${deviceId}-UNLOCK`]}
                      color={C.emerald400}
                      title="Unlock Device"
                    />
                    <ActionButton
                      icon={MapPin}
                      onClick={() => onCommand(deviceId, "LOCATION")}
                      disabled={!device.is_online || isLoading}
                      loading={isLoading === "LOCATION"}
                      success={successStates[`${deviceId}-LOCATION`]}
                      color={C.yellow400}
                      title="Get Location"
                    />
                    <ActionButton
                      icon={MessageSquare}
                      onClick={() => onCommand(deviceId, "MESSAGE")}
                      disabled={!device.is_online || isLoading}
                      loading={isLoading === "MESSAGE"}
                      success={successStates[`${deviceId}-MESSAGE`]}
                      color={C.cyan400}
                      title="Send Message"
                    />
                  </div>
                 </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {devices.length === 0 && (
        <div style={{
          padding: "3rem",
          textAlign: "center",
          color: C.text500
        }}>
          No devices found
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); display: none; }
        }
      `}</style>
    </div>
  );
};

export default CommandTable;