import React, { useState } from "react";
import { Lock, RotateCw, MapPin, MessageSquare } from "lucide-react";
import { lockDevice, unlockDevice, locateDevice, messageDevice } from "../../api/commandApi";
import { Spinner } from "../common/ui";

const C = {
  bg800: "#1e293b", border700: "#334155",
  text50: "#f8fafc", text400: "#94a3b8",
  cyan400: "#22d3ee", purple400: "#a78bfa",
  emerald400: "#34d399", yellow400: "#facc15", red400: "#f87171",
};

const COMMANDS = [
  { label: "Lock",     icon: Lock,          color: C.cyan400,    action: lockDevice },
  { label: "Unlock",   icon: RotateCw,      color: C.emerald400, action: unlockDevice },
  { label: "Locate",   icon: MapPin,        color: C.yellow400,  action: locateDevice },
  { label: "Message",  icon: MessageSquare, color: C.purple400,  action: (id) => messageDevice(id, "Contact Admin") },
];

export default function DeviceCommands({ deviceId, toast, onLog }) {
  const [sending, setSending] = useState(null);

  const handle = async ({ label, action }) => {
    setSending(label);
    try {
      await action(deviceId);
      toast(`"${label}" sent successfully`, "success");
      onLog?.(`Command "${label}" executed`, "ok");
    } catch {
      toast(`${label} failed — check connection`, "error");
      onLog?.(`Command "${label}" failed`, "error");
    } finally {
      setSending(null);
    }
  };

  return (
    <div>
      <p style={{ fontSize: "0.68rem", color: "#64748b", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        Remote Commands
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
        {COMMANDS.map(cmd => (
          <button
            key={cmd.label}
            onClick={() => handle(cmd)}
            disabled={!!sending}
            style={{
              padding: "0.875rem 0.5rem",
              borderRadius: "0.5rem",
              border: `1px solid ${sending === cmd.label ? cmd.color + "60" : C.border700}`,
              backgroundColor: sending === cmd.label ? `${cmd.color}10` : C.bg800,
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
              transition: "all 0.2s", fontFamily: "inherit",
              opacity: sending && sending !== cmd.label ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (!sending) { e.currentTarget.style.borderColor = cmd.color; e.currentTarget.style.transform = "translateY(-2px)"; } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border700; e.currentTarget.style.transform = ""; }}
          >
            {sending === cmd.label
              ? <Spinner size={18} color={cmd.color} />
              : <cmd.icon size={18} color={cmd.color} />}
            <span style={{ fontSize: "0.7rem", color: sending === cmd.label ? cmd.color : C.text400, fontWeight: 500 }}>
              {cmd.label}
            </span>
          </button>
        ))}
      </div>

      {sending && (
        <div style={{ marginTop: "0.875rem", padding: "0.625rem 0.875rem", background: `${C.cyan400}08`, border: `1px solid ${C.cyan400}20`, borderRadius: "0.5rem", fontSize: "0.75rem", color: C.cyan400, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 8 }}>
          <Spinner size={12} /> Executing "{sending}"...
        </div>
      )}
    </div>
  );
}