
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useToast } from "../../components/common/Toast";
// import CommandToolbar from "../../components/commands/CommandToolbar";
// import CommandTable from "../../components/commands/CommandTable";
// import BulkActions from "../../components/commands/BulkActions";
// import MessageModal from "../../components/commands/MessageModal";
// import { getAllDevices, sendCommand, sendBulkCommand } from "../../api/commandApi";
// import { Lock, Unlock, MapPin, MessageSquare, Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

// const C = {
//   bg950: "#020817", bg900: "#0f172a", bg800: "#1e293b", bg700: "#334155",
//   border800: "#1e293b", border700: "#334155", border600: "#475569",
//   text50: "#f8fafc", text300: "#cbd5e1", text400: "#94a3b8", text500: "#64748b",
//   cyan400: "#22d3ee", cyan600: "#0891b2",
//   emerald400: "#34d399", emerald500: "#10b981",
//   red400: "#f87171", red500: "#ef4444",
//   yellow400: "#facc15",
//   purple400: "#a78bfa"
// };

// const CommandsPage = () => {
//   const [devices, setDevices] = useState([]);
//   const [filteredDevices, setFilteredDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDevices, setSelectedDevices] = useState(new Set());
//   const [loadingCommands, setLoadingCommands] = useState({});
//   const [messageModalOpen, setMessageModalOpen] = useState(false);
//   const [pendingCommand, setPendingCommand] = useState(null);
//   const [eventLogs, setEventLogs] = useState([]);
//   const [commandStatuses, setCommandStatuses] = useState({});
//   const [successStates, setSuccessStates] = useState({});
//   const { add: toast } = useToast();

//   // Load devices
//   const loadDevices = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getAllDevices();
//       const deviceList = response.data.data || response.data || [];
//       setDevices(deviceList);
//       setFilteredDevices(deviceList);
//     } catch (error) {
//       console.error("Failed to load devices:", error);
//       toast("Failed to load devices", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => {
//     loadDevices();
//   }, [loadDevices]);

//   // Filter devices based on search
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredDevices(devices);
//     } else {
//       const term = searchTerm.toLowerCase();
//       const filtered = devices.filter(device => 
//         (device.device_name && device.device_name.toLowerCase().includes(term)) ||
//         (device.device_id && device.device_id.toLowerCase().includes(term))
//       );
//       setFilteredDevices(filtered);
//     }
//   }, [searchTerm, devices]);

//   // Add event log entry
//   const addEventLog = (device, commandType, status, message = "", success = true) => {
//     const newLog = {
//       id: Date.now(),
//       timestamp: new Date().toISOString(),
//       deviceName: device.device_name || "Unknown Device",
//       deviceId: device.device_id,
//       commandType,
//       status,
//       message,
//       success
//     };
//     setEventLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep last 100 logs
//   };

//   // Update command status for a device
//   const updateCommandStatus = (deviceId, status) => {
//     setCommandStatuses(prev => ({ ...prev, [deviceId]: status }));
//   };

//   // Highlight device row temporarily
//   const highlightDevice = (deviceId) => {
//     const element = document.querySelector(`[data-device-id="${deviceId}"]`);
//     if (element) {
//       element.style.transition = "background-color 0.3s";
//       element.style.backgroundColor = "rgba(34, 211, 238, 0.2)";
//       setTimeout(() => {
//         element.style.backgroundColor = "";
//       }, 2000);
//     }
//   };

//   // Show temporary success state on button
//   const showButtonSuccess = (deviceId, commandType) => {
//     const key = `${deviceId}-${commandType}`;
//     setSuccessStates(prev => ({ ...prev, [key]: true }));
//     setTimeout(() => {
//       setSuccessStates(prev => ({ ...prev, [key]: false }));
//     }, 1500);
//   };

//   // Send single command
//   const handleSendCommand = async (deviceId, commandType, commandMessage = "") => {
//     const device = devices.find(d => (d.device_id || d.id) === deviceId);
//     if (!device) return;

//     setLoadingCommands(prev => ({ ...prev, [deviceId]: commandType }));
//     updateCommandStatus(deviceId, "Sending");
//     addEventLog(device, commandType, "Sending", commandMessage);

//     try {
//       const response = await sendCommand({
//         device_id: deviceId,
//         command_type: commandType,
//         command_message: commandMessage
//       });

//       // Check if command was successful
//       const success = response.data?.success !== false;
//       const finalStatus = success ? "Command Sent" : "Failed";
      
//       updateCommandStatus(deviceId, finalStatus);
//       addEventLog(device, commandType, finalStatus, commandMessage, success);
      
//       if (success) {
//         toast(`${commandType} command sent successfully to ${device.device_name || deviceId}`, "success");
//         showButtonSuccess(deviceId, commandType);
//         highlightDevice(deviceId);
        
//         // Simulate status progression (in real app, you'd get this from WebSocket)
//         setTimeout(() => updateCommandStatus(deviceId, "Delivered"), 2000);
//         setTimeout(() => updateCommandStatus(deviceId, "Executed"), 4000);
//         setTimeout(() => updateCommandStatus(deviceId, "Seen"), 6000);
//       } else {
//         toast(`${commandType} command failed for ${device.device_name || deviceId}`, "error");
//       }
//     } catch (error) {
//       console.error(`Failed to send ${commandType} command:`, error);
//       updateCommandStatus(deviceId, "Failed");
//       addEventLog(device, commandType, "Failed", error.response?.data?.message || error.message, false);
//       toast(`Failed to send ${commandType} command to ${device.device_name || deviceId}`, "error");
//     } finally {
//       setLoadingCommands(prev => {
//         const newState = { ...prev };
//         delete newState[deviceId];
//         return newState;
//       });
//     }
//   };

//   // Handle command from table
//   const handleCommand = (deviceId, commandType) => {
//     if (commandType === "MESSAGE") {
//       setPendingCommand({ type: commandType, deviceIds: [deviceId], isBulk: false });
//       setMessageModalOpen(true);
//     } else {
//       handleSendCommand(deviceId, commandType);
//     }
//   };

//   // Handle bulk commands
//   const handleBulkCommand = async (commandType, message = "") => {
//     const deviceIds = Array.from(selectedDevices);
//     if (deviceIds.length === 0) {
//       toast("No devices selected", "error");
//       return;
//     }

//     if (commandType === "MESSAGE" && !message) {
//       setPendingCommand({ type: commandType, deviceIds, isBulk: true });
//       setMessageModalOpen(true);
//       return;
//     }

//     // Show loading for all selected devices
//     const loadingState = {};
//     deviceIds.forEach(id => { loadingState[id] = commandType; });
//     setLoadingCommands(prev => ({ ...prev, ...loadingState }));

//     // Update status for all devices
//     deviceIds.forEach(id => updateCommandStatus(id, "Sending"));

//     try {
//       const results = await sendBulkCommand(deviceIds, commandType, message);
//       const succeeded = results.filter(r => r.status === "fulfilled").length;
//       const failed = results.filter(r => r.status === "rejected").length;
      
//       // Update status and add logs for each device
//       deviceIds.forEach((deviceId, index) => {
//         const device = devices.find(d => (d.device_id || d.id) === deviceId);
//         const result = results[index];
//         const success = result?.status === "fulfilled";
//         const finalStatus = success ? "Command Sent" : "Failed";
        
//         if (device) {
//           updateCommandStatus(deviceId, finalStatus);
//           addEventLog(device, commandType, finalStatus, message, success);
//           if (success) highlightDevice(deviceId);
//         }
//       });
      
//       if (succeeded > 0) {
//         toast(`${commandType} command sent to ${succeeded} device${succeeded > 1 ? "s" : ""}`, "success");
//       }
//       if (failed > 0) {
//         toast(`Failed to send to ${failed} device${failed > 1 ? "s" : ""}`, "error");
//       }
//     } catch (error) {
//       console.error(`Bulk ${commandType} failed:`, error);
//       toast(`Bulk ${commandType} command failed`, "error");
//       deviceIds.forEach(id => updateCommandStatus(id, "Failed"));
//     } finally {
//       // Clear loading states
//       setLoadingCommands(prev => {
//         const newState = { ...prev };
//         deviceIds.forEach(id => delete newState[id]);
//         return newState;
//       });
//     }
//   };

//   // Handle message send
//   const handleMessageSend = async (message) => {
//     if (!pendingCommand) return;
    
//     setMessageModalOpen(false);
    
//     if (pendingCommand.isBulk) {
//       await handleBulkCommand("MESSAGE", message);
//     } else {
//       await handleSendCommand(pendingCommand.deviceIds[0], "MESSAGE", message);
//     }
    
//     setPendingCommand(null);
//   };

//   // Select/Deselect device
//   const handleSelectDevice = (deviceId) => {
//     const newSelected = new Set(selectedDevices);
//     if (newSelected.has(deviceId)) {
//       newSelected.delete(deviceId);
//     } else {
//       newSelected.add(deviceId);
//     }
//     setSelectedDevices(newSelected);
//   };

//   // Select all devices
//   const handleSelectAll = (selectAll) => {
//     if (selectAll) {
//       const allIds = new Set(filteredDevices.map(d => d.device_id || d.id));
//       setSelectedDevices(allIds);
//     } else {
//       setSelectedDevices(new Set());
//     }
//   };

//   return (
//     <div style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
//       <CommandToolbar
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         onRefresh={loadDevices}
//         selectedCount={selectedDevices.size}
//         loading={loading}
//       />

//       <BulkActions
//         selectedCount={selectedDevices.size}
//         onBulkLock={() => handleBulkCommand("LOCK")}
//         onBulkUnlock={() => handleBulkCommand("UNLOCK")}
//         onBulkLocation={() => handleBulkCommand("LOCATION")}
//         onBulkMessage={() => handleBulkCommand("MESSAGE")}
//         loading={Object.keys(loadingCommands).length > 0}
//       />

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1.5rem" }}>
//         {/* Left Panel - Remote Commands Card */}
//         <div style={{
//           backgroundColor: C.bg800,
//           border: `1px solid ${C.border800}`,
//           borderRadius: "12px",
//           overflow: "hidden",
//           height: "fit-content"
//         }}>
//           <div style={{
//             padding: "1rem 1.5rem",
//             borderBottom: `1px solid ${C.border800}`,
//             backgroundColor: "rgba(34, 211, 238, 0.05)"
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//               <Activity size={18} color={C.cyan400} />
//               <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: C.text50, margin: 0 }}>Remote Commands</h4>
//             </div>
//             <p style={{ fontSize: "0.7rem", color: C.text500, margin: "0.25rem 0 0" }}>Execute commands on selected devices</p>
//           </div>

//           <div style={{ padding: "1.5rem" }}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
//               <CommandActionCard
//                 icon={Lock}
//                 title="LOCK"
//                 description="Freeze device screen"
//                 color={C.red400}
//                 bgColor="rgba(248, 113, 113, 0.1)"
//                 onClick={() => handleBulkCommand("LOCK")}
//                 disabled={selectedDevices.size === 0}
//                 loading={Object.keys(loadingCommands).length > 0}
//               />
//               <CommandActionCard
//                 icon={Unlock}
//                 title="UNLOCK"
//                 description="Remove overlay screen"
//                 color={C.emerald400}
//                 bgColor="rgba(52, 211, 153, 0.1)"
//                 onClick={() => handleBulkCommand("UNLOCK")}
//                 disabled={selectedDevices.size === 0}
//                 loading={Object.keys(loadingCommands).length > 0}
//               />
//               <CommandActionCard
//                 icon={MapPin}
//                 title="LOCATION"
//                 description="Get device location"
//                 color={C.yellow400}
//                 bgColor="rgba(250, 204, 21, 0.1)"
//                 onClick={() => handleBulkCommand("LOCATION")}
//                 disabled={selectedDevices.size === 0}
//                 loading={Object.keys(loadingCommands).length > 0}
//               />
//               <CommandActionCard
//                 icon={MessageSquare}
//                 title="MESSAGE"
//                 description="Send custom message"
//                 color={C.cyan400}
//                 bgColor="rgba(34, 211, 238, 0.1)"
//                 onClick={() => handleBulkCommand("MESSAGE")}
//                 disabled={selectedDevices.size === 0}
//                 loading={Object.keys(loadingCommands).length > 0}
//               />
//             </div>
            
//             {selectedDevices.size === 0 && (
//               <div style={{
//                 marginTop: "1rem",
//                 padding: "0.75rem",
//                 backgroundColor: "rgba(100, 116, 139, 0.1)",
//                 borderRadius: "8px",
//                 textAlign: "center",
//                 fontSize: "0.75rem",
//                 color: C.text500
//               }}>
//                 Select devices from the table to enable commands
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Panel - Event Logs Card */}
//         <div style={{
//           backgroundColor: C.bg800,
//           border: `1px solid ${C.border800}`,
//           borderRadius: "12px",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           maxHeight: "600px"
//         }}>
//           <div style={{
//             padding: "1rem 1.5rem",
//             borderBottom: `1px solid ${C.border800}`,
//             backgroundColor: "rgba(34, 211, 238, 0.05)"
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "space-between" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                 <Clock size={18} color={C.cyan400} />
//                 <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: C.text50, margin: 0 }}>Event Logs</h4>
//               </div>
//               <span style={{ fontSize: "0.7rem", color: C.text500 }}>Latest first</span>
//             </div>
//             <p style={{ fontSize: "0.7rem", color: C.text500, margin: "0.25rem 0 0" }}>Real-time command execution history</p>
//           </div>

//           <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
//             {eventLogs.length === 0 ? (
//               <div style={{
//                 textAlign: "center",
//                 padding: "2rem",
//                 color: C.text500,
//                 fontSize: "0.8rem"
//               }}>
//                 No command logs yet. Start sending commands to see history.
//               </div>
//             ) : (
//               eventLogs.map((log, index) => (
//                 <EventLogEntry key={log.id || index} log={log} />
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Device Table */}
//       <div style={{ marginTop: "1.5rem" }}>
//         <CommandTable
//           devices={filteredDevices}
//           selectedDevices={selectedDevices}
//           onSelectDevice={handleSelectDevice}
//           onSelectAll={handleSelectAll}
//           onCommand={handleCommand}
//           loadingCommands={loadingCommands}
//           commandStatuses={commandStatuses}
//           successStates={successStates}
//           searchTerm={searchTerm}
//         />
//       </div>

//       <MessageModal
//         isOpen={messageModalOpen}
//         onClose={() => {
//           setMessageModalOpen(false);
//           setPendingCommand(null);
//         }}
//         onSend={handleMessageSend}
//         deviceCount={pendingCommand?.deviceIds?.length || 1}
//         loading={Object.keys(loadingCommands).length > 0}
//       />
//     </div>
//   );
// };

// // Command Action Card Component
// const CommandActionCard = ({ icon: Icon, title, description, color, bgColor, onClick, disabled, loading }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled || loading}
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: "0.5rem",
//       padding: "1rem",
//       backgroundColor: bgColor,
//       border: `1px solid ${color}30`,
//       borderRadius: "10px",
//       cursor: (disabled || loading) ? "not-allowed" : "pointer",
//       opacity: (disabled || loading) ? 0.5 : 1,
//       transition: "all 0.2s",
//       fontFamily: "inherit"
//     }}
//     onMouseEnter={(e) => {
//       if (!disabled && !loading) {
//         e.currentTarget.style.transform = "translateY(-2px)";
//         e.currentTarget.style.borderColor = color;
//       }
//     }}
//     onMouseLeave={(e) => {
//       e.currentTarget.style.transform = "";
//       e.currentTarget.style.borderColor = `${color}30`;
//     }}
//   >
//     <Icon size={24} color={color} />
//     <div>
//       <div style={{ fontSize: "0.85rem", fontWeight: 600, color: color }}>{title}</div>
//       <div style={{ fontSize: "0.65rem", color: C.text500 }}>{description}</div>
//     </div>
//   </button>
// );

// // Event Log Entry Component
// const EventLogEntry = ({ log }) => {
//   const getStatusColor = () => {
//     if (log.status === "Failed") return C.red400;
//     if (log.status === "Executed" || log.status === "Seen") return C.emerald400;
//     if (log.status === "Sending") return C.yellow400;
//     return C.cyan400;
//   };

//   const getStatusIcon = () => {
//     if (log.status === "Failed") return <XCircle size={12} />;
//     if (log.status === "Executed" || log.status === "Seen") return <CheckCircle2 size={12} />;
//     return <Activity size={12} />;
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString();
//   };

//   return (
//     <div style={{
//       padding: "0.75rem",
//       marginBottom: "0.5rem",
//       backgroundColor: "rgba(15, 23, 42, 0.5)",
//       borderRadius: "8px",
//       borderLeft: `3px solid ${getStatusColor()}`,
//       transition: "all 0.2s"
//     }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//           <span style={{ fontSize: "0.7rem", color: getStatusColor(), display: "flex", alignItems: "center", gap: "0.25rem" }}>
//             {getStatusIcon()}
//             {log.status}
//           </span>
//           <span style={{ fontSize: "0.65rem", color: C.text500 }}>{formatTime(log.timestamp)}</span>
//         </div>
//         <span style={{ fontSize: "0.7rem", fontWeight: 600, color: C.text300 }}>{log.commandType}</span>
//       </div>
//       <div style={{ fontSize: "0.75rem", color: C.text400, marginBottom: "0.25rem" }}>
//         <strong>{log.deviceName}</strong> <span style={{ fontSize: "0.65rem", color: C.text500 }}>({log.deviceId})</span>
//       </div>
//       {log.message && (
//         <div style={{ fontSize: "0.7rem", color: C.text500, marginTop: "0.25rem", fontStyle: "italic" }}>
//           "{log.message}"
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommandsPage;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "../../components/common/Toast";
import CommandToolbar from "../../components/commands/CommandToolbar";
import CommandTable from "../../components/commands/CommandTable";
import MessageModal from "../../components/commands/MessageModal";
import { getAllDevices, sendCommand, isCommandSuccess } from "../../api/commandApi";
import { Lock, Unlock, MapPin, MessageSquare, Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

const C = {
  bg950: "#020817", bg900: "#0f172a", bg800: "#1e293b", bg700: "#334155",
  border800: "#1e293b", border700: "#334155", border600: "#475569",
  text50: "#f8fafc", text300: "#cbd5e1", text400: "#94a3b8", text500: "#64748b",
  cyan400: "#22d3ee", cyan600: "#0891b2",
  emerald400: "#34d399", emerald500: "#10b981",
  red400: "#f87171", red500: "#ef4444",
  yellow400: "#facc15",
  purple400: "#a78bfa"
};

const CommandsPage = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevices, setSelectedDevices] = useState(new Set());
  const [loadingCommands, setLoadingCommands] = useState({});
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [pendingCommand, setPendingCommand] = useState(null);
  const [eventLogs, setEventLogs] = useState([]);
  const [commandStatuses, setCommandStatuses] = useState({});
  const [successStates, setSuccessStates] = useState({});
  const { add: toast } = useToast();

  // Load devices
  const loadDevices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllDevices();
      const deviceList = response.data.data || response.data || [];
      setDevices(deviceList);
      setFilteredDevices(deviceList);
    } catch (error) {
      console.error("Failed to load devices:", error);
      toast("Failed to load devices", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  // Filter devices based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDevices(devices);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = devices.filter(device => 
        (device.device_name && device.device_name.toLowerCase().includes(term)) ||
        (device.device_id && device.device_id.toLowerCase().includes(term))
      );
      setFilteredDevices(filtered);
    }
  }, [searchTerm, devices]);

  // Get filtered event logs based on selected devices
  const getFilteredEventLogs = useMemo(() => {
    if (selectedDevices.size === 0) {
      return eventLogs;
    }
    return eventLogs.filter(log => selectedDevices.has(log.deviceId));
  }, [eventLogs, selectedDevices]);

  // Add event log entry
  const addEventLog = (device, commandType, status, message = "", success = true) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      deviceName: device.device_name || "Unknown Device",
      deviceId: device.device_id,
      commandType,
      status,
      message,
      success
    };
    setEventLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Update command status for a device
  const updateCommandStatus = (deviceId, status) => {
    setCommandStatuses(prev => ({ ...prev, [deviceId]: status }));
  };

  // Highlight device row temporarily
  const highlightDevice = (deviceId) => {
    const element = document.querySelector(`[data-device-id="${deviceId}"]`);
    if (element) {
      element.style.transition = "background-color 0.3s";
      element.style.backgroundColor = "rgba(34, 211, 238, 0.3)";
      setTimeout(() => {
        element.style.backgroundColor = "";
      }, 2000);
    }
  };

  // Show temporary success state on button
  const showButtonSuccess = (deviceId, commandType) => {
    const key = `${deviceId}-${commandType}`;
    setSuccessStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSuccessStates(prev => ({ ...prev, [key]: false }));
    }, 1500);
  };

  // Send single command
  const handleSendCommand = async (deviceId, commandType, commandMessage = "") => {
    const device = devices.find(d => (d.device_id || d.id) === deviceId);
    if (!device) return;

    // Set loading state for this specific button
    setLoadingCommands(prev => ({ ...prev, [deviceId]: commandType }));
    updateCommandStatus(deviceId, "Sending");
    addEventLog(device, commandType, "Sending", commandMessage);

    try {
      const response = await sendCommand({
        device_id: deviceId,
        command_type: commandType,
        command_message: commandMessage
      });

      // Check if command was successful using the helper function
      const success = isCommandSuccess(response);
      
      if (success) {
        // Update status to Command Sent immediately
        updateCommandStatus(deviceId, "Command Sent");
        addEventLog(device, commandType, "Command Sent", commandMessage, true);
        
        // Show success toast with device name
        const deviceName = device.device_name || deviceId;
        toast(`${commandType} command sent successfully to ${deviceName}`, "success");
        
        // Show visual feedback
        showButtonSuccess(deviceId, commandType);
        highlightDevice(deviceId);
        
        // Simulate status progression (in production, this would come from WebSocket)
        setTimeout(() => {
          if (commandStatuses[deviceId] === "Command Sent") {
            updateCommandStatus(deviceId, "Delivered");
            addEventLog(device, commandType, "Delivered", commandMessage, true);
          }
        }, 2000);
        
        setTimeout(() => {
          if (commandStatuses[deviceId] === "Delivered") {
            updateCommandStatus(deviceId, "Executed");
            addEventLog(device, commandType, "Executed", commandMessage, true);
          }
        }, 4000);
        
        setTimeout(() => {
          if (commandStatuses[deviceId] === "Executed") {
            updateCommandStatus(deviceId, "Seen");
            addEventLog(device, commandType, "Seen", commandMessage, true);
          }
        }, 6000);
      } else {
        // This should not happen with HTTP 200, but handle just in case
        updateCommandStatus(deviceId, "Failed");
        addEventLog(device, commandType, "Failed", commandMessage, false);
        toast(`${commandType} command failed for ${device.device_name || deviceId}`, "error");
      }
    } catch (error) {
      console.error(`Failed to send ${commandType} command:`, error);
      
      // Check if error response actually indicates success (some APIs return 200 but error in data)
      const errorSuccess = error.response && isCommandSuccess(error.response);
      
      if (errorSuccess) {
        // Treat as success if response indicates success despite catch block
        updateCommandStatus(deviceId, "Command Sent");
        addEventLog(device, commandType, "Command Sent", commandMessage, true);
        toast(`${commandType} command sent successfully to ${device.device_name || deviceId}`, "success");
        showButtonSuccess(deviceId, commandType);
        highlightDevice(deviceId);
      } else {
        // Genuine failure
        updateCommandStatus(deviceId, "Failed");
        addEventLog(device, commandType, "Failed", error.response?.data?.message || error.message, false);
        toast(`Failed to send ${commandType} command to ${device.device_name || deviceId}`, "error");
      }
    } finally {
      // Clear loading state
      setLoadingCommands(prev => {
        const newState = { ...prev };
        delete newState[deviceId];
        return newState;
      });
    }
  };

  // Handle single command from table
  const handleCommand = (deviceId, commandType) => {
    if (commandType === "MESSAGE") {
      setPendingCommand({ type: commandType, deviceIds: [deviceId], isBulk: false });
      setMessageModalOpen(true);
    } else {
      handleSendCommand(deviceId, commandType);
    }
  };

  // Handle bulk command for selected devices
  const handleBulkCommand = async (commandType, message = "") => {
    const deviceIds = Array.from(selectedDevices);
    if (deviceIds.length === 0) {
      toast("No devices selected", "error");
      return;
    }

    if (commandType === "MESSAGE" && !message) {
      setPendingCommand({ type: commandType, deviceIds, isBulk: true });
      setMessageModalOpen(true);
      return;
    }

    // Show loading for all selected devices
    const loadingState = {};
    deviceIds.forEach(id => { loadingState[id] = commandType; });
    setLoadingCommands(prev => ({ ...prev, ...loadingState }));

    // Update status for all devices
    deviceIds.forEach(id => updateCommandStatus(id, "Sending"));

    let successCount = 0;
    let failureCount = 0;

    // Send commands sequentially (to avoid overwhelming the server)
    for (const deviceId of deviceIds) {
      const device = devices.find(d => (d.device_id || d.id) === deviceId);
      if (!device) continue;

      try {
        const response = await sendCommand({
          device_id: deviceId,
          command_type: commandType,
          command_message: message || getDefaultMessage(commandType)
        });

        if (isCommandSuccess(response)) {
          successCount++;
          updateCommandStatus(deviceId, "Command Sent");
          addEventLog(device, commandType, "Command Sent", message, true);
          highlightDevice(deviceId);
        } else {
          failureCount++;
          updateCommandStatus(deviceId, "Failed");
          addEventLog(device, commandType, "Failed", message, false);
        }
      } catch (error) {
        // Check if error response actually indicates success
        if (error.response && isCommandSuccess(error.response)) {
          successCount++;
          updateCommandStatus(deviceId, "Command Sent");
          addEventLog(device, commandType, "Command Sent", message, true);
          highlightDevice(deviceId);
        } else {
          failureCount++;
          updateCommandStatus(deviceId, "Failed");
          addEventLog(device, commandType, "Failed", error.message, false);
        }
      } finally {
        // Clear loading for this device
        setLoadingCommands(prev => {
          const newState = { ...prev };
          delete newState[deviceId];
          return newState;
        });
      }
    }

    // Show summary toast
    if (successCount > 0) {
      toast(`${commandType} command sent successfully to ${successCount} device${successCount > 1 ? "s" : ""}`, "success");
    }
    if (failureCount > 0) {
      toast(`Failed to send ${commandType} command to ${failureCount} device${failureCount > 1 ? "s" : ""}`, "error");
    }
  };

  const getDefaultMessage = (commandType) => {
    switch (commandType) {
      case "LOCK": return "Device locked by CyberNest";
      case "UNLOCK": return "Device unlocked by CyberNest";
      case "LOCATION": return "Send current location";
      default: return "";
    }
  };

  // Handle message send
  const handleMessageSend = async (message) => {
    if (!pendingCommand) return;
    
    setMessageModalOpen(false);
    
    if (pendingCommand.isBulk) {
      await handleBulkCommand("MESSAGE", message);
    } else {
      await handleSendCommand(pendingCommand.deviceIds[0], "MESSAGE", message);
    }
    
    setPendingCommand(null);
  };

  // Select/Deselect device
  const handleSelectDevice = (deviceId) => {
    const newSelected = new Set(selectedDevices);
    if (newSelected.has(deviceId)) {
      newSelected.delete(deviceId);
    } else {
      newSelected.add(deviceId);
    }
    setSelectedDevices(newSelected);
  };

  // Select all devices
  const handleSelectAll = (selectAll) => {
    if (selectAll) {
      const allIds = new Set(filteredDevices.map(d => d.device_id || d.id));
      setSelectedDevices(allIds);
    } else {
      setSelectedDevices(new Set());
    }
  };

  // Handle single device click for filtering
  const handleDeviceSelect = (deviceId) => {
    // Toggle selection when clicking on row
    handleSelectDevice(deviceId);
  };

  const selectedCount = selectedDevices.size;

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
      <CommandToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={loadDevices}
        selectedCount={selectedCount}
        loading={loading}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Left Panel - Remote Commands Card */}
        <div style={{
          backgroundColor: C.bg800,
          border: `1px solid ${C.border800}`,
          borderRadius: "12px",
          overflow: "hidden",
          height: "fit-content"
        }}>
          <div style={{
            padding: "1rem 1.5rem",
            borderBottom: `1px solid ${C.border800}`,
            backgroundColor: "rgba(34, 211, 238, 0.05)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Activity size={18} color={C.cyan400} />
              <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: C.text50, margin: 0 }}>Remote Commands</h4>
            </div>
            <p style={{ fontSize: "0.7rem", color: C.text500, margin: "0.25rem 0 0" }}>
              Execute commands on selected devices ({selectedCount} selected)
            </p>
          </div>

          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <CommandActionCard
                icon={Lock}
                title="LOCK"
                description="Freeze device screen"
                color={C.red400}
                bgColor="rgba(248, 113, 113, 0.1)"
                onClick={() => handleBulkCommand("LOCK")}
                disabled={selectedCount === 0}
                loading={Object.keys(loadingCommands).length > 0}
              />
              <CommandActionCard
                icon={Unlock}
                title="UNLOCK"
                description="Remove overlay screen"
                color={C.emerald400}
                bgColor="rgba(52, 211, 153, 0.1)"
                onClick={() => handleBulkCommand("UNLOCK")}
                disabled={selectedCount === 0}
                loading={Object.keys(loadingCommands).length > 0}
              />
              <CommandActionCard
                icon={MapPin}
                title="LOCATION"
                description="Get device location"
                color={C.yellow400}
                bgColor="rgba(250, 204, 21, 0.1)"
                onClick={() => handleBulkCommand("LOCATION")}
                disabled={selectedCount === 0}
                loading={Object.keys(loadingCommands).length > 0}
              />
              <CommandActionCard
                icon={MessageSquare}
                title="MESSAGE"
                description="Send custom message"
                color={C.cyan400}
                bgColor="rgba(34, 211, 238, 0.1)"
                onClick={() => handleBulkCommand("MESSAGE")}
                disabled={selectedCount === 0}
                loading={Object.keys(loadingCommands).length > 0}
              />
            </div>
            
            {selectedCount === 0 && (
              <div style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: "rgba(100, 116, 139, 0.1)",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "0.75rem",
                color: C.text500
              }}>
                Select devices from the table to enable commands
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Event Logs Card with Filtering */}
        <div style={{
          backgroundColor: C.bg800,
          border: `1px solid ${C.border800}`,
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "400px"
        }}>
          <div style={{
            padding: "1rem 1.5rem",
            borderBottom: `1px solid ${C.border800}`,
            backgroundColor: "rgba(34, 211, 238, 0.05)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={18} color={C.cyan400} />
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: C.text50, margin: 0 }}>Event Logs</h4>
              </div>
              <span style={{ fontSize: "0.7rem", color: C.text500 }}>
                {selectedCount > 0 ? `Filtered: ${selectedCount} device${selectedCount > 1 ? "s" : ""}` : "All devices"}
              </span>
            </div>
            <p style={{ fontSize: "0.7rem", color: C.text500, margin: "0.25rem 0 0" }}>
              {selectedCount > 0 ? "Showing logs for selected devices" : "Showing logs for all devices"}
            </p>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
            {getFilteredEventLogs.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "2rem",
                color: C.text500,
                fontSize: "0.8rem"
              }}>
                {selectedCount > 0 ? "No command logs for selected devices" : "No command logs yet. Start sending commands to see history."}
              </div>
            ) : (
              getFilteredEventLogs.map((log, index) => (
                <EventLogEntry key={log.id || index} log={log} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Device Table */}
      <CommandTable
        devices={filteredDevices}
        selectedDevices={selectedDevices}
        onSelectDevice={handleSelectDevice}
        onSelectAll={handleSelectAll}
        onCommand={handleCommand}
        loadingCommands={loadingCommands}
        commandStatuses={commandStatuses}
        successStates={successStates}
        onDeviceSelect={handleDeviceSelect}
      />

      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => {
          setMessageModalOpen(false);
          setPendingCommand(null);
        }}
        onSend={handleMessageSend}
        deviceCount={pendingCommand?.deviceIds?.length || 1}
        loading={Object.keys(loadingCommands).length > 0}
      />
    </div>
  );
};

// Command Action Card Component
const CommandActionCard = ({ icon: Icon, title, description, color, bgColor, onClick, disabled, loading }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1rem",
      backgroundColor: bgColor,
      border: `1px solid ${color}30`,
      borderRadius: "10px",
      cursor: (disabled || loading) ? "not-allowed" : "pointer",
      opacity: (disabled || loading) ? 0.5 : 1,
      transition: "all 0.2s",
      fontFamily: "inherit"
    }}
    onMouseEnter={(e) => {
      if (!disabled && !loading) {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = color;
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.borderColor = `${color}30`;
    }}
  >
    <Icon size={24} color={color} />
    <div>
      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: color }}>{title}</div>
      <div style={{ fontSize: "0.65rem", color: C.text500 }}>{description}</div>
    </div>
  </button>
);

// Event Log Entry Component
const EventLogEntry = ({ log }) => {
  const getStatusColor = () => {
    if (log.status === "Failed") return C.red400;
    if (log.status === "Executed" || log.status === "Seen") return C.emerald400;
    if (log.status === "Sending") return C.yellow400;
    return C.cyan400;
  };

  const getStatusIcon = () => {
    if (log.status === "Failed") return <XCircle size={12} />;
    if (log.status === "Executed" || log.status === "Seen") return <CheckCircle2 size={12} />;
    return <Activity size={12} />;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div style={{
      padding: "0.75rem",
      marginBottom: "0.5rem",
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderRadius: "8px",
      borderLeft: `3px solid ${getStatusColor()}`,
      transition: "all 0.2s"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.7rem", color: getStatusColor(), display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {getStatusIcon()}
            {log.status}
          </span>
          <span style={{ fontSize: "0.65rem", color: C.text500 }}>{formatTime(log.timestamp)}</span>
        </div>
        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: C.text300 }}>{log.commandType}</span>
      </div>
      <div style={{ fontSize: "0.75rem", color: C.text400, marginBottom: "0.25rem" }}>
        <strong>{log.deviceName}</strong> <span style={{ fontSize: "0.65rem", color: C.text500 }}>({log.deviceId})</span>
      </div>
      {log.message && (
        <div style={{ fontSize: "0.7rem", color: C.text500, marginTop: "0.25rem", fontStyle: "italic" }}>
          "{log.message}"
        </div>
      )}
    </div>
  );
};

export default CommandsPage;