// function Toast({ message }) {

//   return (
//     <div className="toast-box">
//       {message}
//     </div>
//   );

// }

// export default Toast;

import React, { useState, useRef, useCallback } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const C = {
  emerald400: "#34d399", emerald600: "#059669",
  red400: "#f87171",     red600: "#dc2626",
  cyan400: "#22d3ee",    cyan700: "#0e7490",
};

// ── Toast display component ──────────────────────────────────────────────────
export function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => {
        const isSuccess = t.type === "success";
        const isError   = t.type === "error";
        return (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 16px", borderRadius: 10, minWidth: 260,
            background: isSuccess ? "rgba(6,78,59,0.95)" : isError ? "rgba(127,29,29,0.95)" : "rgba(15,40,80,0.95)",
            border: `1px solid ${isSuccess ? C.emerald600 : isError ? C.red600 : C.cyan700}`,
            color: isSuccess ? C.emerald400 : isError ? C.red400 : C.cyan400,
            fontSize: 13, fontFamily: "monospace",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            animation: "cn-slide-in 0.25s ease",
          }}>
            {isSuccess ? <CheckCircle2 size={15} /> : isError ? <XCircle size={15} /> : <Info size={15} />}
            <span style={{ flex: 1 }}>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── useToast hook ─────────────────────────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const add = useCallback((message, type = "info") => {
    const id = ++idRef.current;
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  return { toasts, add };
}