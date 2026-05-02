import React from "react";
import { Eye, BatteryLow, BatteryMedium, BatteryFull } from "lucide-react";
import { S, StatusDot } from "../common/ui";

const C = {
  bg800: "#1e293b", border700: "#334155", border800: "#1e293b",
  text50: "#f8fafc", text300: "#cbd5e1", text400: "#94a3b8", text500: "#64748b", text600: "#475569",
  cyan400: "#22d3ee", emerald400: "#34d399", yellow400: "#facc15", red400: "#f87171",
};

export default function DeviceTable({ devices, onDeviceClick }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "rgba(15,23,42,0.6)", borderBottom: `1px solid ${C.border800}` }}>
            {["Device Name", "Device ID", "Android", "Status", "Battery", "Network", "Last Seen", "Actions"].map(h => (
              <th key={h} style={S.tableHeader}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {devices.map((d, i) => {
            const isLast   = i === devices.length - 1;
            const border   = isLast ? "none" : `1px solid ${C.border800}`;
            const battery  = d.battery_level ?? null;
            const status   = d.is_online ? "online" : "offline";

            return (
              <tr
                key={d.id || d.device_id || i}
                style={{ transition: "background 0.15s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(30,41,59,0.4)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                {/* Device Name */}
                <td style={{ ...S.tableCell, borderBottom: border }}>
                  <span style={{ fontSize: "0.875rem", color: C.text50, fontWeight: 500 }}>{d.device_name || "—"}</span>
                </td>

                {/* Device ID */}
                <td style={{ ...S.tableCell, borderBottom: border }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: C.cyan400 }}>
                    {String(d.device_id || "—").slice(0, 18)}
                  </span>
                </td>

                {/* Android Version */}
                <td style={{ ...S.tableCell, borderBottom: border, fontSize: "0.8rem", color: C.text400 }}>
                  {d.android_version ? `Android ${d.android_version}` : "—"}
                </td>

                {/* Status */}
                <td style={{ ...S.tableCell, borderBottom: border }}>
                  <StatusDot status={status} />
                </td>

                {/* Battery */}
                <td style={{ ...S.tableCell, borderBottom: border }}>
                  {battery !== null ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {battery < 20
                        ? <BatteryLow size={14} color={C.red400} />
                        : battery < 50
                        ? <BatteryMedium size={14} color={C.yellow400} />
                        : <BatteryFull size={14} color={C.emerald400} />}
                      <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: battery < 20 ? C.red400 : battery < 50 ? C.yellow400 : C.text300 }}>
                        {battery}%
                      </span>
                    </div>
                  ) : <span style={{ color: C.text600, fontSize: "0.8rem" }}>—</span>}
                </td>

                {/* Network */}
                <td style={{ ...S.tableCell, borderBottom: border, fontSize: "0.8rem", color: C.text400 }}>
                  {d.network_type || "—"}
                </td>

                {/* Last Seen */}
                <td style={{ ...S.tableCell, borderBottom: border, fontFamily: "monospace", fontSize: "0.75rem", color: C.text500 }}>
                  {d.last_seen ? String(d.last_seen).slice(0, 16) : "—"}
                </td>

                {/* View */}
                <td style={{ ...S.tableCell, borderBottom: border }}>
                  <button
                    onClick={() => onDeviceClick(d)}
                    style={{
                      padding: "0.375rem 0.75rem",
                      background: "rgba(100,116,139,0.08)",
                      border: `1px solid ${C.border700}`,
                      borderRadius: "0.375rem", cursor: "pointer",
                      color: C.text300, fontSize: "0.75rem", fontWeight: 500,
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(100,116,139,0.18)"; e.currentTarget.style.color = C.text50; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(100,116,139,0.08)"; e.currentTarget.style.color = C.text300; }}
                  >
                    <Eye size={12} /> View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}