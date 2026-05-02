import React, { useState } from "react";
import { QrCode, Copy, CheckCircle2, X, AlertTriangle } from "lucide-react";
import QRCode from "react-qr-code";           // npm install react-qr-code
import { generateEnrollmentCode } from "../../api/enrollmentApi";
import { S } from "../common/ui";
import { Spinner } from "../common/ui";

const C = {
  bg900: "#0f172a", bg800: "#1e293b",
  border700: "#334155", border800: "#1e293b",
  text50: "#f8fafc", text300: "#cbd5e1", text400: "#94a3b8", text500: "#64748b",
  cyan400: "#22d3ee", cyan600: "#0891b2",
  emerald400: "#34d399", emerald600: "#059669",
  yellow400: "#facc15", red400: "#f87171",
};

export default function EnrollmentModal({ onClose, toast }) {
  const [code, setCode]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await generateEnrollmentCode();
      setCode(res.data?.data?.code || res.data?.code || null);
    } catch {
      toast("Failed to generate enrollment code", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(2,8,23,0.9)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 60, padding: "1rem",
      }}
    >
      <div style={{
        backgroundColor: C.bg900, border: `1px solid ${C.border700}`,
        borderRadius: "1rem", width: "100%", maxWidth: 420,
        boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
        animation: "cn-fade-in 0.2s ease", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "1.125rem 1.5rem", borderBottom: `1px solid ${C.border800}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)" }}>
              <QrCode size={16} color={C.cyan400} />
            </div>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: C.text50, margin: 0 }}>Enroll New Device</p>
          </div>
          <button onClick={onClose} style={{ padding: "0.5rem", background: "none", border: "none", cursor: "pointer", color: C.text500 }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem" }}>
          {!code ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.85rem", color: C.text400, marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Generate a one-time enrollment code. Share it with the Android agent to register the device under your account.
              </p>
              <button style={{ ...S.btnPrimary, width: "100%", justifyContent: "center" }} onClick={generate} disabled={loading}>
                {loading ? <><Spinner size={14} color="#fff" /> Generating...</> : <><QrCode size={14} /> Generate Code & QR</>}
              </button>
            </div>
          ) : (
            <>
              {/* QR */}
              <div style={{ display: "flex", justifyContent: "center", padding: "1.5rem", background: "#fff", borderRadius: "0.75rem", marginBottom: "1.25rem" }}>
                <QRCode value={code} size={160} />
              </div>

              {/* Code copy */}
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: "0.68rem", color: C.text500, margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                  Enrollment Code
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text" value={code} readOnly
                    style={{ ...S.input, fontFamily: "monospace", fontSize: "1rem", color: C.cyan400, textAlign: "center", letterSpacing: "0.15em" }}
                  />
                  <button
                    onClick={copyCode}
                    style={{
                      padding: "0.625rem 0.875rem", borderRadius: "0.5rem", cursor: "pointer", flexShrink: 0,
                      backgroundColor: copied ? "rgba(6,78,59,0.5)" : C.bg800,
                      border: `1px solid ${copied ? C.emerald600 : C.border700}`,
                      color: copied ? C.emerald400 : C.text400, transition: "all 0.2s",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div style={{ padding: "0.875rem", backgroundColor: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "0.625rem" }}>
                <p style={{ fontSize: "0.72rem", color: C.cyan400, margin: "0 0 0.5rem", fontWeight: 600 }}>ℹ HOW TO ENROLL</p>
                {[
                  "Open CyberNest Agent app on target Android device",
                  "Enter the enrollment code above OR scan the QR",
                  "App will register device and link to your account",
                  "Device will appear in your fleet within seconds",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: i < 3 ? "0.25rem" : 0 }}>
                    <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: "50%", backgroundColor: "rgba(8,56,63,0.9)", color: C.cyan400, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.58rem", fontWeight: 700, marginTop: 1 }}>{i + 1}</span>
                    <span style={{ fontSize: "0.75rem", color: C.text400 }}>{step}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "1rem 1.5rem", borderTop: `1px solid ${C.border800}` }}>
          {code && (
            <button style={{ ...S.btnSecondary, marginBottom: "0.5rem", width: "100%", justifyContent: "center" }} onClick={() => setCode(null)}>
              Generate Another Code
            </button>
          )}
          <button style={{ ...S.btnSecondary, width: "100%", justifyContent: "center" }} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}