import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity, AlertTriangle, BarChart3, LogOut, Shield,
  Smartphone, Settings, CheckCircle2, XCircle, RefreshCw, Plus,
  User, ChevronRight, BatteryLow, Terminal, ShieldCheck,
} from "lucide-react";

import Sidebar         from "../../components/common/Sidebar";
import Topbar          from "../../components/common/Topbar";
import { Toast, useToast } from "../../components/common/Toast";
import { S, StatusDot, Spinner } from '../../components/common/ui';
import EnrollmentModal  from "../../components/enrollment/EnrollmentModal";
import DeviceTable      from "../../components/devices/DeviceTable";
import DeviceCommands from '../../components/devices/DeviceCommands';

import { fetchDevices, fetchDeviceById } from "../../api/deviceApi";
import { getProfile }                    from "../../api/authApi";
import { useAuth }                        from "../../context/AuthContext";

const C = {
  bg950: "#020817", bg900: "#0f172a", bg800: "#1e293b", bg700: "#334155",
  border800: "#1e293b", border700: "#334155", border600: "#475569",
  text50: "#f8fafc", text300: "#cbd5e1", text400: "#94a3b8", text500: "#64748b", text600: "#475569",
  cyan400: "#22d3ee", cyan600: "#0891b2",
  emerald400: "#34d399", emerald500: "#10b981", emerald600: "#059669",
  red400: "#f87171", red500: "#ef4444",
  yellow400: "#facc15", yellow500: "#eab308",
  purple400: "#a78bfa", orange400: "#fb923c",
};

// ─── Pages rendered inside dashboard ──────────────────────────────────────────

function DashboardHome({ devices, onNavigate }) {
  const [liveLog, setLiveLog] = useState([
    "[ INFO ]  System initialized — CyberNest MDM v2.0",
    "[ SYNC ]  Policy sync completed for enrolled devices",
    "[ INFO ]  Backend connection established",
  ]);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const msgs = [
      "[ SYNC ]  Device heartbeat received",
      "[ INFO ]  Policy enforcement check completed",
      "[ WARN ]  Battery low alert processed",
      "[ SYNC ]  Configuration push — all devices",
      "[ OK   ]  Device location update received",
    ];
    const t = setInterval(() => {
      setLiveLog(p => [...p.slice(-9), msgs[Math.floor(Math.random() * msgs.length)]]);
    }, 4000);
    const pt = setInterval(() => setPulse(v => !v), 1800);
    return () => { clearInterval(t); clearInterval(pt); };
  }, []);

  const online    = devices.filter(d => d.is_online).length;
  const offline   = devices.filter(d => !d.is_online).length;
  const lowBat    = devices.filter(d => (d.battery_level || 0) < 20).length;
  const total     = devices.length;

  const metrics = [
    { label: "Total Enrolled", value: total, icon: Smartphone, color: C.cyan400,    sub: "Fleet size",   bg: "rgba(8,145,178,0.1)",   border: "rgba(34,211,238,0.2)" },
    { label: "Online Devices", value: online, icon: CheckCircle2, color: C.emerald400, sub: "Active now",  bg: "rgba(5,150,105,0.1)",   border: "rgba(52,211,153,0.2)" },
    { label: "Offline",        value: offline, icon: XCircle,     color: C.red400,    sub: "Unreachable", bg: "rgba(220,38,38,0.1)",   border: "rgba(248,113,113,0.2)" },
    { label: "Low Battery",    value: lowBat,  icon: BatteryLow,  color: C.yellow400, sub: "Need charge", bg: "rgba(202,138,4,0.1)",   border: "rgba(250,204,21,0.2)" },
  ];

  const quickActions = [
    { label: "Enroll Device",   desc: "Add new device to fleet",       icon: Plus,        color: C.cyan400,    nav: "devices" },
    { label: "Push Commands",   desc: "Send commands to devices",       icon: Terminal,    color: C.purple400,  nav: "commands" },
    { label: "Manage Policies", desc: "Configure device policies",      icon: ShieldCheck, color: C.emerald400, nav: "policies" },
    { label: "Admin Settings",  desc: "System configuration",           icon: Settings,    color: C.yellow400,  nav: "settings" },
  ];

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.text50, margin: "0 0 0.2rem" }}>System Overview</h3>
        <p style={{ fontSize: "0.75rem", color: C.text500, margin: 0, fontFamily: "monospace" }}>Real-time device fleet monitoring</p>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} style={{ ...S.card, padding: "1.25rem", cursor: "pointer", transition: "all 0.25s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${m.color}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = C.border800; }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${m.color}60, transparent)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: "0.68rem", color: C.text500, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</p>
                  <p style={{ fontSize: "2.2rem", fontWeight: 700, color: C.text50, margin: "0 0 0.375rem", fontFamily: "monospace", lineHeight: 1 }}>{m.value}</p>
                  <p style={{ fontSize: "0.7rem", color: m.color, margin: 0 }}>↑ {m.sub}</p>
                </div>
                <div style={{ padding: "0.625rem", borderRadius: "0.5rem", background: m.bg, border: `1px solid ${m.border}` }}>
                  <Icon size={20} color={m.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Terminal */}
      <div style={{ ...S.card, overflow: "hidden", marginBottom: "1.75rem" }}>
        <div style={{ padding: "0.875rem 1.25rem", borderBottom: `1px solid ${C.border800}`, display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {[C.red400, C.yellow400, C.emerald400].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.8 }} />
            ))}
          </div>
          <Activity size={13} color={C.cyan400} />
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: C.text300, letterSpacing: "0.04em" }}>LIVE ACTIVITY TERMINAL</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.emerald400, boxShadow: pulse ? `0 0 8px ${C.emerald400}` : "none", transition: "box-shadow 0.4s" }} />
            <span style={{ fontSize: "0.65rem", color: C.text500, fontFamily: "monospace" }}>LIVE</span>
          </div>
        </div>
        <div style={{ padding: "1rem 1.25rem", fontFamily: "monospace", fontSize: "0.78rem", backgroundColor: "rgba(0,0,0,0.25)", maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {liveLog.map((line, i) => (
            <div key={i} style={{ color: line.includes("WARN") ? C.yellow400 : line.includes("SYNC") ? C.cyan400 : C.text400 }}>
              <span style={{ color: C.border600, marginRight: "0.5rem" }}>›</span>{line}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <p style={{ fontSize: "0.7rem", color: C.text500, margin: "0 0 0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Quick Actions</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.875rem" }}>
        {quickActions.map((a, i) => {
          const Icon = a.icon;
          return (
            <button key={i} onClick={() => onNavigate(a.nav)}
              style={{ ...S.card, padding: "1.125rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.875rem", transition: "all 0.2s", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border800; e.currentTarget.style.transform = ""; }}>
              <div style={{ padding: "0.625rem", borderRadius: "0.5rem", background: `${a.color}12`, border: `1px solid ${a.color}30`, flexShrink: 0 }}>
                <Icon size={16} color={a.color} />
              </div>
              <div style={{ textAlign: "left", flex: 1 }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: C.text50, margin: "0 0 0.2rem" }}>{a.label}</p>
                <p style={{ fontSize: "0.7rem", color: C.text500, margin: 0 }}>{a.desc}</p>
              </div>
              <ChevronRight size={14} color={C.text600} />
            </button>
          );
        })}
      </div>

      {/* Recent Devices preview */}
      {devices.length > 0 && (
        <div style={{ marginTop: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
            <p style={{ fontSize: "0.7rem", color: C.text500, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Recent Devices</p>
            <button onClick={() => onNavigate("devices")} style={{ background: "none", border: "none", color: C.cyan400, fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div style={{ ...S.card, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border800}`, backgroundColor: "rgba(15,23,42,0.5)" }}>
                  {["Device Name", "Device ID", "Status", "Last Seen"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.65rem", fontWeight: 600, color: C.text500, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devices.slice(0, 5).map((d, i) => (
                  <tr key={d.id || i} onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(30,41,59,0.4)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                    <td style={{ padding: "0.875rem 1rem", borderBottom: i < 4 ? `1px solid ${C.border800}` : "none" }}>
                      <span style={{ fontSize: "0.85rem", color: C.text300, fontWeight: 500 }}>{d.device_name || "—"}</span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", borderBottom: i < 4 ? `1px solid ${C.border800}` : "none" }}>
                      <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: C.cyan400 }}>{String(d.device_id || "—").slice(0, 18)}</span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", borderBottom: i < 4 ? `1px solid ${C.border800}` : "none" }}>
                      <StatusDot status={d.is_online ? "online" : "offline"} />
                    </td>
                    <td style={{ padding: "0.875rem 1rem", borderBottom: i < 4 ? `1px solid ${C.border800}` : "none", fontFamily: "monospace", fontSize: "0.75rem", color: C.text500 }}>
                      {d.last_seen ? String(d.last_seen).slice(0, 16) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Devices Page ─────────────────────────────────────────────────────────────
function DevicesPage({ onDeviceClick, toast }) {
  const [devices, setDevices]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [search, setSearch]     = useState("");
  const [showEnroll, setShowEnroll] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchDevices();
      const data = res.data;
      setDevices(Array.isArray(data) ? data : data.devices || data.data || []);
    } catch {
      toast("Could not fetch devices", "error");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = devices.filter(d => {
    const q = search.toLowerCase();
    return (
      (d.device_name  || "").toLowerCase().includes(q) ||
      (d.device_id    || "").toLowerCase().includes(q) ||
      (d.android_version || "").toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.text50, margin: "0 0 0.2rem" }}>Device Fleet</h3>
          <p style={{ fontSize: "0.75rem", color: C.text500, margin: 0, fontFamily: "monospace" }}>{filtered.length} of {devices.length} devices</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button style={S.btnSecondary} onClick={load} disabled={loading}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button style={S.btnPrimary} onClick={() => setShowEnroll(true)}>
            <Plus size={14} /> Enroll Device
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "1.25rem", maxWidth: 380 }}>
        <input type="text" placeholder="Search devices..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...S.input, paddingLeft: "0.875rem" }} />
      </div>

      <div style={{ ...S.card, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: C.text500 }}>Loading devices...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <Smartphone size={48} color={C.border700} style={{ margin: "0 auto 1rem", display: "block" }} />
            <p style={{ color: C.text400, margin: "0 0 1rem" }}>No devices found</p>
            <button style={S.btnPrimary} onClick={() => setShowEnroll(true)}><Plus size={14} /> Enroll First Device</button>
          </div>
        ) : (
          <DeviceTable devices={filtered} onDeviceClick={onDeviceClick} />
        )}
      </div>

      {showEnroll && <EnrollmentModal onClose={() => setShowEnroll(false)} toast={toast} />}
    </div>
  );
}

// ─── Device Detail Page ───────────────────────────────────────────────────────
function DeviceDetailPage({ device, onBack, toast }) {
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: "Device detail opened", level: "info" },
  ]);
  const addLog = (msg, level = "info") => setLogs(p => [{ time: new Date().toLocaleTimeString(), msg, level }, ...p.slice(0, 19)]);

  const battery = device?.battery_level ?? null;

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
        <button onClick={onBack} style={{ ...S.btnSecondary, padding: "0.5rem 0.875rem" }}>← Back</button>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.text50, margin: "0 0 0.2rem" }}>{device?.device_name || "Device"}</h3>
          <p style={{ fontSize: "0.72rem", color: C.text500, margin: 0, fontFamily: "monospace" }}>ID: {device?.device_id}</p>
        </div>
        <div style={{ marginLeft: "auto" }}><StatusDot status={device?.is_online ? "online" : "offline"} /></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Info */}
        <div style={{ backgroundColor: C.bg800, border: `1px solid ${C.border800}`, borderRadius: "0.75rem", padding: "1.5rem" }}>
          <p style={{ fontSize: "0.68rem", color: C.text500, margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Device Information</p>
          {[
            ["Device Name",      device?.device_name],
            ["Device ID",        device?.device_id],
            ["Android Version",  device?.android_version ? `Android ${device.android_version}` : "—"],
            ["Network Type",     device?.network_type],
            ["Last Seen",        device?.last_seen ? String(device.last_seen).slice(0, 16) : "—"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: `1px solid ${C.border800}50` }}>
              <span style={{ fontSize: "0.78rem", color: C.text500 }}>{k}</span>
              <span style={{ fontSize: "0.78rem", color: C.text300, fontFamily: "monospace" }}>{v || "—"}</span>
            </div>
          ))}
          {battery !== null && (
            <div style={{ marginTop: "0.875rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.78rem", color: C.text500 }}>Battery</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: battery < 20 ? C.red400 : battery < 50 ? C.yellow400 : C.emerald400 }}>{battery}%</span>
              </div>
              <div style={{ height: 6, backgroundColor: C.bg700, borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${battery}%`, backgroundColor: battery < 20 ? C.red500 : battery < 50 ? C.yellow500 : C.emerald500, borderRadius: 9999 }} />
              </div>
            </div>
          )}
        </div>

        {/* Commands */}
        <div style={{ backgroundColor: C.bg800, border: `1px solid ${C.border800}`, borderRadius: "0.75rem", padding: "1.5rem" }}>
          <DeviceCommands deviceId={device?.device_id} toast={toast} onLog={addLog} />
        </div>
      </div>

      {/* Event Log */}
      <div style={{ backgroundColor: C.bg800, border: `1px solid ${C.border800}`, borderRadius: "0.75rem", padding: "1.5rem" }}>
        <p style={{ fontSize: "0.68rem", color: C.text500, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Event Log</p>
        <div style={{ maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {logs.map((log, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.35rem 0", borderBottom: `1px solid ${C.border800}40`, fontFamily: "monospace", fontSize: "0.75rem" }}>
              <span style={{ color: C.text600, flexShrink: 0 }}>{log.time}</span>
              <span style={{ color: log.level === "ok" ? C.emerald400 : log.level === "error" ? C.red400 : C.text400 }}>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [activePage, setActivePage]         = useState("dashboard");
  const [devices, setDevices]               = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showLogoutConfirm, setShowLogout]  = useState(false);
  const { toasts, add: toast }              = useToast();
  const { logout }                          = useAuth();
  const navigate                            = useNavigate();

  // Load devices for dashboard metrics
  useEffect(() => {
    fetchDevices()
      .then(res => {
        const d = res.data;
        setDevices(Array.isArray(d) ? d : d.devices || d.data || []);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
  logout(); // From useAuth() hook
  navigate("/login", { replace: true }); // Use replace to clear history
};

  const goTo = (page) => {
    setActivePage(page);
    setSelectedDevice(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg950, color: C.text50, fontFamily: "'JetBrains Mono','Fira Code','IBM Plex Mono',monospace" }}>
      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.018, backgroundImage: "linear-gradient(0deg,transparent 24%,rgba(34,211,238,.07) 25%,rgba(34,211,238,.07) 26%,transparent 27%,transparent 74%,rgba(34,211,238,.07) 75%,rgba(34,211,238,.07) 76%,transparent 77%),linear-gradient(90deg,transparent 24%,rgba(34,211,238,.07) 25%,rgba(34,211,238,.07) 26%,transparent 27%,transparent 74%,rgba(34,211,238,.07) 75%,rgba(34,211,238,.07) 76%,transparent 77%)", backgroundSize: "50px 50px" }} />

      <div style={{ position: "relative", display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar
          activePage={activePage}
          onNavigate={goTo}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(o => !o)}
          onLogout={() => setShowLogout(true)}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: sidebarOpen ? 220 : 68, transition: "margin-left 0.3s ease", overflow: "hidden" }}>
          <Topbar
            activePage={activePage}
            selectedDevice={selectedDevice}
            onProfileClick={() => goTo("profile")}
          />

          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {activePage === "dashboard"     && <DashboardHome devices={devices} onNavigate={goTo} />}
            {activePage === "devices"       && <DevicesPage onDeviceClick={d => { setSelectedDevice(d); setActivePage("device-detail"); }} toast={toast} />}
            {activePage === "device-detail" && <DeviceDetailPage device={selectedDevice} onBack={() => goTo("devices")} toast={toast} />}
            {/* commands, policies, settings, profile — add as separate files */}
          </div>
        </div>
      </div>

      {/* Logout confirm */}
      {showLogoutConfirm && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(2,8,23,0.85)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
          <div style={{ backgroundColor: C.bg900, border: `1px solid ${C.border800}`, borderRadius: "1rem", padding: "2rem", maxWidth: 360, width: "90%", textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ padding: "0.875rem", borderRadius: "0.75rem", backgroundColor: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", display: "inline-flex", marginBottom: "1rem" }}>
              <LogOut size={22} color={C.red400} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: C.text50, margin: "0 0 0.5rem" }}>Logout Confirm</h3>
            <p style={{ fontSize: "0.8rem", color: C.text500, margin: "0 0 1.5rem" }}>You will be logged out of the dashboard</p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setShowLogout(false)} style={{ ...S.btnSecondary, flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={handleLogout} style={{ ...S.btnDanger, flex: 1, justifyContent: "center" }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      <Toast toasts={toasts} />

      <style>{`
        @keyframes cn-spin { to { transform: rotate(360deg); } }
        @keyframes cn-fade-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cn-slide-in { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#334155; border-radius:10px; }
      `}</style>
    </div>
  );
}