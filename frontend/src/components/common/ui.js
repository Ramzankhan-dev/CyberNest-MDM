// src/components/common/ui.js
// Small reusable atoms used across all pages

import React from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const C = {
  bg700: "#334155", bg800: "#1e293b",
  border700: "#334155", border800: "#1e293b",
  text50: "#f8fafc", text300: "#cbd5e1", text400: "#94a3b8", text500: "#64748b",
  cyan400: "#22d3ee", cyan600: "#0891b2",
  emerald400: "#34d399", emerald600: "#059669",
  red400: "#f87171", yellow400: "#facc15",
};

// ── Spinner ────────────────────────────────────────────────────────────────────
export function Spinner({ size = 20, color = C.cyan400 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `2px solid ${color}30`,
      borderTop: `2px solid ${color}`,
      animation: "cn-spin 0.8s linear infinite",
      display: "inline-block", flexShrink: 0,
    }} />
  );
}

// ── Toggle ─────────────────────────────────────────────────────────────────────
export function Toggle({ value, onChange, color = C.emerald600 }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        position: "relative", width: 44, height: 22, borderRadius: 9999,
        backgroundColor: value ? color : C.bg700,
        border: "none", cursor: "pointer", flexShrink: 0,
        transition: "background-color 0.2s",
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: value ? 24 : 3,
        width: 16, height: 16,
        backgroundColor: "#fff", borderRadius: "50%",
        transition: "left 0.2s",
      }} />
    </button>
  );
}

// ── StatusDot ──────────────────────────────────────────────────────────────────
export function StatusDot({ status }) {
  const map = {
    online: C.emerald400, enrolled: C.emerald400, active: C.emerald400,
    offline: C.text500, unknown: C.text500,
    warning: C.yellow400, pending: C.yellow400,
  };
  const color = map[status] || C.text500;
  const isOnline = ["online", "enrolled", "active"].includes(status);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{
        width: 7, height: 7, borderRadius: "50%",
        backgroundColor: color,
        boxShadow: isOnline ? `0 0 6px ${color}` : "none",
      }} />
      <span style={{ fontSize: "0.75rem", fontWeight: 500, color }}>{status}</span>
    </div>
  );
}

// ── PageHeader ─────────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: 12 }}>
      <div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.text50, margin: "0 0 0.2rem", letterSpacing: "0.02em" }}>{title}</h3>
        {subtitle && <p style={{ fontSize: "0.75rem", color: C.text500, margin: 0, fontFamily: "monospace" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ── SectionCard ────────────────────────────────────────────────────────────────
export function SectionCard({ children, style = {} }) {
  return (
    <div
      style={{ backgroundColor: C.bg800, border: `1px solid ${C.border800}`, borderRadius: "0.75rem", padding: "1.5rem", ...style }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.border700}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border800}
    >
      {children}
    </div>
  );
}

// ── Shared style constants (re-exported for pages) ────────────────────────────
export const S = {
  card: {
    backgroundColor: "#0f172a",
    border: `1px solid ${C.border800}`,
    borderRadius: "0.75rem",
  },
  input: {
    width: "100%", padding: "0.625rem 0.875rem",
    backgroundColor: C.bg800, border: `1px solid ${C.border700}`,
    borderRadius: "0.5rem", fontSize: "0.875rem", color: C.text50,
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.625rem 1.25rem", backgroundColor: C.cyan600,
    border: "none", borderRadius: "0.5rem", color: "#fff",
    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  btnSecondary: {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.625rem 1.25rem", backgroundColor: C.bg800,
    border: `1px solid ${C.border700}`, borderRadius: "0.5rem", color: C.text300,
    fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
  },
  btnDanger: {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.625rem 1.25rem",
    backgroundColor: "rgba(220,38,38,0.12)",
    border: "1px solid rgba(220,38,38,0.3)", borderRadius: "0.5rem", color: C.red400,
    fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  tableHeader: {
    padding: "0.75rem 1rem", textAlign: "left",
    fontSize: "0.65rem", fontWeight: 600, color: C.text500,
    textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap",
  },
  tableCell: {
    padding: "0.875rem 1rem", borderBottom: `1px solid ${C.border800}`,
  },
};