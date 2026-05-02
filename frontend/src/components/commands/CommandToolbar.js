import React from "react";
import { Search, RefreshCw, CheckSquare } from "lucide-react";

const C = {
  bg800: "#1e293b",
  border800: "#1e293b",
  text50: "#f8fafc",
  text300: "#cbd5e1",
  text400: "#94a3b8",
  text500: "#64748b",
  cyan400: "#22d3ee",
  input: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    padding: "0.5rem 0.75rem",
    color: "#f8fafc",
    fontSize: "0.8rem",
    outline: "none"
  }
};

const CommandToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  onRefresh, 
  selectedCount,
  loading 
}) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
      gap: "1rem",
      flexWrap: "wrap"
    }}>
      <div>
        <h3 style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: C.text50,
          margin: "0 0 0.25rem"
        }}>
          Command Center
        </h3>
        <p style={{
          fontSize: "0.75rem",
          color: C.text500,
          margin: 0,
          fontFamily: "monospace"
        }}>
          Send commands to enrolled devices
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{
            position: "absolute",
            left: "0.625rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: C.text500
          }} />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              ...C.input,
              paddingLeft: "2rem",
              width: "240px"
            }}
          />
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            ...C.input,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            backgroundColor: C.bg800,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = C.cyan400;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = C.border800;
            e.currentTarget.style.transform = "";
          }}
        >
          <RefreshCw size={14} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
          <span>Refresh</span>
        </button>

        {selectedCount > 0 && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.375rem 0.875rem",
            backgroundColor: "rgba(34, 211, 238, 0.1)",
            border: `1px solid ${C.cyan400}30`,
            borderRadius: "8px",
            color: C.cyan400,
            fontSize: "0.75rem",
            fontWeight: 500
          }}>
            <CheckSquare size={14} />
            <span>{selectedCount} device{selectedCount !== 1 ? "s" : ""} selected</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CommandToolbar;