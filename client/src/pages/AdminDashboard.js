import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#385B4A" }}>Admin Dashboard</h1>
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", alignItems: "center", justifyContent: "center" }}>
        <button onClick={() => navigate("/admin/appointments")} style={buttonStyle}>Manage Appointments</button>
        <button onClick={() => navigate("/admin/lab-tests")} style={buttonStyle}>Manage Lab Tests</button>
        <button onClick={() => navigate("/admin/medicine-orders")} style={buttonStyle}>Manage Medicine Orders</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "1rem 2rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#385B4A",
  color: "white",
  fontSize: "1.2rem",
  cursor: "pointer",
  fontWeight : "bold",
  marginTop: "1rem"
};

export default AdminDashboard;
