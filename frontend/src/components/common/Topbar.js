import React, { useState, useEffect } from "react";

const C = {
  bg800: "#1e293b", border800: "#1e293b", border700: "#334155",
  text50: "#f8fafc", text400: "#94a3b8", text500: "#64748b",
  cyan400: "#22d3ee", emerald400: "#34d399",
};

const pageTitles = {
  dashboard: "Dashboard", devices: "Devices", commands: "Commands",
  policies: "Policies", settings: "Settings", profile: "Profile",
  "device-detail": "Device Detail",
};

export default function Topbar({ activePage, selectedDevice, onProfileClick }) {
  const [pulse, setPulse] = useState(true);
  const adminName  = localStorage.getItem("adminName")  || "Admin";
  const adminEmail = localStorage.getItem("adminEmail") || "";
  const initials   = adminName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "AD";

  useEffect(() => {
    const t = setInterval(() => setPulse(v => !v), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      borderBottom: `1px solid ${C.border800}`,
      backgroundColor: "rgba(15,23,42,0.8)",
      backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 30, flexShrink: 0,
    }}>
      <div style={{ padding: "0 1.75rem", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: C.text50, margin: 0, letterSpacing: "0.02em" }}>
            {pageTitles[activePage] || activePage}
          </h2>
          {activePage === "device-detail" && selectedDevice && (
            <span style={{ fontSize: "0.75rem", color: C.text500, fontFamily: "monospace" }}>
              / {(selectedDevice.device_name || "Device").slice(0, 20)}
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Backend status dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.75rem", borderRadius: "0.375rem", backgroundColor: C.bg800, border: `1px solid ${C.border700}` }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.emerald400, boxShadow: pulse ? `0 0 6px ${C.emerald400}` : "none", transition: "box-shadow 0.4s" }} />
            <span style={{ fontSize: "0.68rem", color: C.text400, letterSpacing: "0.04em" }}>BACKEND:ONLINE</span>
          </div>

          {/* Admin pill */}
          <button
            onClick={onProfileClick}
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", paddingLeft: "1rem", borderLeft: `1px solid ${C.border800}`, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: C.text50, margin: 0 }}>{adminName}</p>
              <p style={{ fontSize: "0.62rem", color: C.text500, margin: 0, fontFamily: "monospace" }}>
                {adminEmail.slice(0, 20)}{adminEmail.length > 20 ? "…" : ""}
              </p>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: "0.5rem",
              background: "linear-gradient(135deg, rgba(14,116,144,0.25), rgba(124,58,237,0.2))",
              border: "1px solid rgba(34,211,238,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.cyan400, fontWeight: 700, fontSize: "0.72rem",
            }}>
              {initials}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}