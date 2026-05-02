// import React from "react";
// import { Lock, Unlock, MapPin, MessageSquare } from "lucide-react";

// const C = {
//   bg800: "#1e293b",
//   border700: "#334155",
//   text50: "#f8fafc",
//   text500: "#64748b",
//   cyan400: "#22d3ee",
//   emerald400: "#34d399",
//   red400: "#f87171",
//   purple400: "#a78bfa",
//   yellow400: "#facc15"
// };

// const BulkActions = ({ 
//   selectedCount, 
//   onBulkLock, 
//   onBulkUnlock, 
//   onBulkLocation, 
//   onBulkMessage,
//   loading 
// }) => {
//   if (selectedCount === 0) return null;

//   const actions = [
//     { label: "Lock Selected", icon: Lock, color: C.red400, onClick: onBulkLock },
//     { label: "Unlock Selected", icon: Unlock, color: C.emerald400, onClick: onBulkUnlock },
//     { label: "Get Location", icon: MapPin, color: C.purple400, onClick: onBulkLocation },
//     { label: "Send Message", icon: MessageSquare, color: C.cyan400, onClick: onBulkMessage }
//   ];

//   return (
//     <div style={{
//       backgroundColor: C.bg800,
//       border: `1px solid ${C.border700}`,
//       borderRadius: "12px",
//       padding: "1rem",
//       marginBottom: "1.5rem"
//     }}>
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginBottom: "1rem"
//       }}>
//         <span style={{
//           fontSize: "0.75rem",
//           fontWeight: 600,
//           color: C.text500,
//           textTransform: "uppercase",
//           letterSpacing: "0.08em"
//         }}>
//           Bulk Actions ({selectedCount} devices)
//         </span>
//       </div>
      
//       <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
//         {actions.map((action, idx) => {
//           const Icon = action.icon;
//           return (
//             <button
//               key={idx}
//               onClick={action.onClick}
//               disabled={loading}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.5rem",
//                 padding: "0.5rem 1rem",
//                 backgroundColor: `${action.color}10`,
//                 border: `1px solid ${action.color}30`,
//                 borderRadius: "8px",
//                 color: action.color,
//                 fontSize: "0.8rem",
//                 fontWeight: 500,
//                 cursor: loading ? "not-allowed" : "pointer",
//                 transition: "all 0.2s",
//                 fontFamily: "inherit"
//               }}
//               onMouseEnter={(e) => {
//                 if (!loading) {
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.backgroundColor = `${action.color}20`;
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "";
//                 e.currentTarget.style.backgroundColor = `${action.color}10`;
//               }}
//             >
//               <Icon size={14} />
//               <span>{action.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BulkActions;

import React from "react";
import { Lock, Unlock, MapPin, MessageSquare, Loader2 } from "lucide-react";

const C = {
  bg800: "#1e293b",
  border700: "#334155",
  text50: "#f8fafc",
  text500: "#64748b",
  cyan400: "#22d3ee",
  emerald400: "#34d399",
  red400: "#f87171",
  purple400: "#a78bfa",
  yellow400: "#facc15"
};

const BulkActions = ({ 
  selectedCount, 
  onBulkLock, 
  onBulkUnlock, 
  onBulkLocation, 
  onBulkMessage,
  loading 
}) => {
  if (selectedCount === 0) return null;

  const actions = [
    { label: "Lock Selected", icon: Lock, color: C.red400, onClick: onBulkLock, description: "Freeze selected devices" },
    { label: "Unlock Selected", icon: Unlock, color: C.emerald400, onClick: onBulkUnlock, description: "Unfreeze selected devices" },
    { label: "Get Location", icon: MapPin, color: C.yellow400, onClick: onBulkLocation, description: "Request location from devices" },
    { label: "Send Message", icon: MessageSquare, color: C.cyan400, onClick: onBulkMessage, description: "Send custom message" }
  ];

  return (
    <div style={{
      backgroundColor: C.bg800,
      border: `1px solid ${C.border700}`,
      borderRadius: "12px",
      padding: "1rem",
      marginBottom: "1.5rem",
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem"
      }}>
        <div>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: C.text500,
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>
            Bulk Actions ({selectedCount} device{selectedCount !== 1 ? "s" : ""})
          </span>
          <p style={{
            fontSize: "0.7rem",
            color: C.text500,
            margin: "0.25rem 0 0"
          }}>
            Execute commands on all selected devices
          </p>
        </div>
      </div>
      
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: `${action.color}10`,
                border: `1px solid ${action.color}30`,
                borderRadius: "8px",
                color: action.color,
                fontSize: "0.8rem",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.backgroundColor = `${action.color}20`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.backgroundColor = `${action.color}10`;
              }}
            >
              {loading ? (
                <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Icon size={14} />
              )}
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BulkActions;