// import React, { useState } from "react";
// import { X, Send } from "lucide-react";

// const C = {
//   bg900: "#0f172a",
//   bg800: "#1e293b",
//   border700: "#334155",
//   border800: "#1e293b",
//   text50: "#f8fafc",
//   text300: "#cbd5e1",
//   text400: "#94a3b8",
//   text500: "#64748b",
//   cyan400: "#22d3ee",
//   red400: "#f87171"
// };

// const MessageModal = ({ isOpen, onClose, onSend, deviceCount = 1, loading }) => {
//   const [message, setMessage] = useState("");
//   const maxLength = 500;

//   const handleSend = () => {
//     if (message.trim()) {
//       onSend(message.trim());
//       setMessage("");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div style={{
//       position: "fixed",
//       inset: 0,
//       backgroundColor: "rgba(2, 8, 23, 0.85)",
//       backdropFilter: "blur(8px)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000
//     }}>
//       <div style={{
//         backgroundColor: C.bg900,
//         border: `1px solid ${C.border800}`,
//         borderRadius: "16px",
//         width: "90%",
//         maxWidth: "500px",
//         overflow: "hidden"
//       }}>
//         {/* Header */}
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "1.25rem 1.5rem",
//           borderBottom: `1px solid ${C.border800}`
//         }}>
//           <div>
//             <h3 style={{
//               fontSize: "1.1rem",
//               fontWeight: 700,
//               color: C.text50,
//               margin: "0 0 0.25rem"
//             }}>
//               Send Message
//             </h3>
//             <p style={{
//               fontSize: "0.7rem",
//               color: C.text500,
//               margin: 0
//             }}>
//               {deviceCount === 1 ? "To selected device" : `To ${deviceCount} devices`}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             style={{
//               background: "none",
//               border: "none",
//               color: C.text500,
//               cursor: "pointer",
//               padding: "0.25rem",
//               transition: "color 0.2s"
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.color = C.text300}
//             onMouseLeave={(e) => e.currentTarget.style.color = C.text500}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Body */}
//         <div style={{ padding: "1.5rem" }}>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
//             placeholder="Type your message here..."
//             rows={5}
//             style={{
//               width: "100%",
//               backgroundColor: C.bg800,
//               border: `1px solid ${C.border700}`,
//               borderRadius: "8px",
//               padding: "0.75rem",
//               color: C.text300,
//               fontSize: "0.85rem",
//               fontFamily: "inherit",
//               resize: "vertical",
//               outline: "none"
//             }}
//           />
//           <div style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginTop: "0.5rem"
//           }}>
//             <span style={{
//               fontSize: "0.7rem",
//               color: message.length === maxLength ? C.red400 : C.text500
//             }}>
//               {message.length}/{maxLength} characters
//             </span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div style={{
//           display: "flex",
//           gap: "0.75rem",
//           padding: "1rem 1.5rem",
//           borderTop: `1px solid ${C.border800}`,
//           justifyContent: "flex-end"
//         }}>
//           <button
//             onClick={onClose}
//             style={{
//               padding: "0.5rem 1rem",
//               backgroundColor: "transparent",
//               border: `1px solid ${C.border700}`,
//               borderRadius: "6px",
//               color: C.text400,
//               fontSize: "0.8rem",
//               cursor: "pointer",
//               transition: "all 0.2s"
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.borderColor = C.text500}
//             onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border700}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSend}
//             disabled={!message.trim() || loading}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "0.5rem",
//               padding: "0.5rem 1rem",
//               backgroundColor: C.cyan400,
//               border: "none",
//               borderRadius: "6px",
//               color: "#020817",
//               fontSize: "0.8rem",
//               fontWeight: 600,
//               cursor: (!message.trim() || loading) ? "not-allowed" : "pointer",
//               opacity: (!message.trim() || loading) ? 0.5 : 1,
//               transition: "all 0.2s"
//             }}
//           >
//             <Send size={14} />
//             <span>{loading ? "Sending..." : "Send Message"}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageModal;

import React, { useState } from "react";
import { X, Send } from "lucide-react";

const C = {
  bg900: "#0f172a",
  bg800: "#1e293b",
  border700: "#334155",
  border800: "#1e293b",
  text50: "#f8fafc",
  text300: "#cbd5e1",
  text400: "#94a3b8",
  text500: "#64748b",
  cyan400: "#22d3ee",
  red400: "#f87171"
};

const MessageModal = ({ isOpen, onClose, onSend, deviceCount = 1, loading }) => {
  const [message, setMessage] = useState("");
  const maxLength = 500;

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(2, 8, 23, 0.85)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: C.bg900,
        border: `1px solid ${C.border800}`,
        borderRadius: "16px",
        width: "90%",
        maxWidth: "500px",
        overflow: "hidden"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          borderBottom: `1px solid ${C.border800}`
        }}>
          <div>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: C.text50,
              margin: "0 0 0.25rem"
            }}>
              Send Message
            </h3>
            <p style={{
              fontSize: "0.7rem",
              color: C.text500,
              margin: 0
            }}>
              {deviceCount === 1 ? "To selected device" : `To ${deviceCount} devices`}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: C.text500,
              cursor: "pointer",
              padding: "0.25rem",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = C.text300}
            onMouseLeave={(e) => e.currentTarget.style.color = C.text500}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            placeholder="Type your message here..."
            rows={5}
            style={{
              width: "100%",
              backgroundColor: C.bg800,
              border: `1px solid ${C.border700}`,
              borderRadius: "8px",
              padding: "0.75rem",
              color: C.text300,
              fontSize: "0.85rem",
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none"
            }}
          />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.5rem"
          }}>
            <span style={{
              fontSize: "0.7rem",
              color: message.length === maxLength ? C.red400 : C.text500
            }}>
              {message.length}/{maxLength} characters
            </span>
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: "0.75rem",
          padding: "1rem 1.5rem",
          borderTop: `1px solid ${C.border800}`,
          justifyContent: "flex-end"
        }}>
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "transparent",
              border: `1px solid ${C.border700}`,
              borderRadius: "6px",
              color: C.text400,
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = C.text500}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border700}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: C.cyan400,
              border: "none",
              borderRadius: "6px",
              color: "#020817",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: (!message.trim() || loading) ? "not-allowed" : "pointer",
              opacity: (!message.trim() || loading) ? 0.5 : 1,
              transition: "all 0.2s"
            }}
          >
            <Send size={14} />
            <span>{loading ? "Sending..." : "Send Message"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;