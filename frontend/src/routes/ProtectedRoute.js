import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#020817", color: "#22d3ee", fontFamily: "monospace" }}>
        Loading...
      </div>
    );
  }

  return token ? children : <Navigate to="/login" replace />;
}