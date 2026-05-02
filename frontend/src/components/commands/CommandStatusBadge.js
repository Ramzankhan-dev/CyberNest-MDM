// import React from "react";

// const statusConfig = {
//   "No Command": { color: "#64748b", bg: "rgba(100, 116, 139, 0.1)", icon: "○" },
//   "Command Sent": { color: "#22d3ee", bg: "rgba(34, 211, 238, 0.1)", icon: "📤" },
//   "Delivered": { color: "#a78bfa", bg: "rgba(167, 139, 250, 0.1)", icon: "✓" },
//   "Executed": { color: "#34d399", bg: "rgba(52, 211, 153, 0.1)", icon: "✔" },
//   "Seen": { color: "#facc15", bg: "rgba(250, 204, 21, 0.1)", icon: "👁" }
// };

// const CommandStatusBadge = ({ status = "No Command" }) => {
//   const config = statusConfig[status] || statusConfig["No Command"];
  
//   return (
//     <div style={{
//       display: "inline-flex",
//       alignItems: "center",
//       gap: "0.375rem",
//       padding: "0.25rem 0.625rem",
//       borderRadius: "6px",
//       backgroundColor: config.bg,
//       border: `1px solid ${config.color}30`,
//       fontSize: "0.7rem",
//       fontWeight: 500,
//       color: config.color,
//       fontFamily: "monospace",
//       whiteSpace: "nowrap"
//     }}>
//       <span style={{ fontSize: "0.75rem" }}>{config.icon}</span>
//       <span>{status}</span>
//     </div>
//   );
// };

// export default CommandStatusBadge;


import React from "react";

const statusConfig = {
  "No Command": { color: "#64748b", bg: "rgba(100, 116, 139, 0.1)", icon: "○", label: "No Command" },
  "Sending": { color: "#facc15", bg: "rgba(250, 204, 21, 0.1)", icon: "⟳", label: "Sending..." },
  "Command Sent": { color: "#22d3ee", bg: "rgba(34, 211, 238, 0.1)", icon: "📤", label: "Command Sent" },
  "Delivered": { color: "#a78bfa", bg: "rgba(167, 139, 250, 0.1)", icon: "✓", label: "Delivered" },
  "Executed": { color: "#34d399", bg: "rgba(52, 211, 153, 0.1)", icon: "✔", label: "Executed" },
  "Seen": { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)", icon: "👁", label: "Seen" },
  "Failed": { color: "#f87171", bg: "rgba(248, 113, 113, 0.1)", icon: "✗", label: "Failed" }
};

const CommandStatusBadge = ({ status = "No Command" }) => {
  const config = statusConfig[status] || statusConfig["No Command"];
  
  // Add animation for sending state
  const isAnimated = status === "Sending";
  
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      padding: "0.25rem 0.625rem",
      borderRadius: "6px",
      backgroundColor: config.bg,
      border: `1px solid ${config.color}30`,
      fontSize: "0.7rem",
      fontWeight: 500,
      color: config.color,
      fontFamily: "monospace",
      whiteSpace: "nowrap"
    }}>
      <span style={{ 
        fontSize: "0.75rem",
        animation: isAnimated ? "pulse 1s ease-in-out infinite" : "none",
        display: "inline-block"
      }}>
        {config.icon}
      </span>
      <span>{config.label}</span>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default CommandStatusBadge;