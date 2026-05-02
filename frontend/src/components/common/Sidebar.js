import React from "react";
import {
  BarChart3, Smartphone, Terminal, ShieldCheck,
  Settings, User, Shield, Menu, LogOut,
} from "lucide-react";

const C = {
  bg900: "#0f172a", bg800: "#1e293b", bg700: "#334155",
  border800: "#1e293b", border700: "#334155",
  text50: "#f8fafc", text400: "#94a3b8", text500: "#64748b", text600: "#475569",
  cyan400: "#22d3ee", red400: "#f87171",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "devices",   label: "Devices",   icon: Smartphone },
  { id: "commands",  label: "Commands",  icon: Terminal },
  { id: "policies",  label: "Policies",  icon: ShieldCheck },
  { id: "settings",  label: "Settings",  icon: Settings },
  { id: "profile",   label: "Profile",   icon: User },
];

export default function Sidebar({ activePage, onNavigate, open, onToggle, onLogout }) {
  const btnStyle = (active) => ({
    width: "100%", display: "flex", alignItems: "center",
    gap: "0.75rem", padding: "0.625rem 1rem", borderRadius: "0.5rem",
    border: active ? `1px solid ${C.border700}` : "1px solid transparent",
    backgroundColor: active ? C.bg800 : "transparent",
    color: active ? C.cyan400 : C.text400,
    fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
    transition: "all 0.2s", fontFamily: "inherit",
    justifyContent: open ? "flex-start" : "center",
  });

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
      width: open ? 220 : 68,
      backgroundColor: C.bg900, borderRight: `1px solid ${C.border800}`,
      display: "flex", flexDirection: "column",
      transition: "width 0.3s ease", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        padding: "1rem", borderBottom: `1px solid ${C.border800}`,
        display: "flex", alignItems: "center", gap: "0.75rem",
        minHeight: 60, flexShrink: 0,
      }}>
        <div style={{
          flexShrink: 0, padding: "0.5rem", borderRadius: "0.5rem",
          backgroundColor: C.bg800, border: `1px solid ${C.border700}`,
          display: "flex", boxShadow: "0 0 12px rgba(34,211,238,0.15)",
        }}>
          <Shield size={17} color={C.cyan400} />
        </div>
        {open && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: C.text50, margin: 0, letterSpacing: "0.05em" }}>
              CYBER<span style={{ color: C.cyan400 }}>NEST</span>
            </p>
            <p style={{ fontSize: "0.58rem", color: C.text500, margin: 0, letterSpacing: "0.1em" }}>MDM PLATFORM</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.2rem", overflowY: "auto" }}>
        {open && (
          <p style={{ fontSize: "0.58rem", color: C.text600, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.375rem 0.25rem", margin: "0 0 0.25rem", fontWeight: 600 }}>
            Main Menu
          </p>
        )}
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id || (id === "devices" && activePage === "device-detail");
          return (
            <button key={id} onClick={() => onNavigate(id)} style={btnStyle(isActive)} title={!open ? label : undefined}>
              <Icon size={15} style={{ flexShrink: 0 }} />
              {open && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "0.75rem", borderTop: `1px solid ${C.border800}`, flexShrink: 0, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <button onClick={onToggle} style={btnStyle(false)}>
          <Menu size={15} style={{ flexShrink: 0 }} />
          {open && <span>Collapse</span>}
        </button>
        <button
          onClick={onLogout}
          style={{ ...btnStyle(false), color: C.red400 }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(220,38,38,0.08)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}