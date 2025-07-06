import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:5000/api/admin/appointments", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Appointments API response:", response.data);

            // Defensive response handling
            if (Array.isArray(response.data)) {
                setAppointments(response.data);
            } else if (Array.isArray(response.data.appointments)) {
                setAppointments(response.data.appointments);
            } else {
                console.warn("Unexpected response format:", response.data);
                setAppointments([]);
            }
        } catch (error) {
            console.error("Error fetching appointments", error);
            setAppointments([]);
        }
    };

    const handleStatusChange = async (id, status) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/admin/appointments/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAppointments(); // Refresh data after update
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Manage Doctor Appointments</h2>
            {Array.isArray(appointments) && appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                appointments.map(app => (
                    <div key={app.id} style={styles.card}>
                        <p><strong>ID:</strong> {app.id}</p>
                        <p><strong>Doctor:</strong> {app.doctorName}</p>
                        <p><strong>Date:</strong> {app.appointmentDate}</p>
                        <p><strong>Status:</strong> {app.status}</p>
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={() => handleStatusChange(app.id, "approved")}
                                style={styles.approveBtn}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusChange(app.id, "rejected")}
                                style={styles.rejectBtn}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        marginBottom: "1.5rem",
        fontSize: "1.8rem",
        color: "#385B4A",
        fontWeight: "bold",
    },
    card: {
        borderRadius: "8px",
        width: "80%",
        border: "0.52px solid #808080",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1rem 0 1rem 1rem",
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: "1.2rem",
    },
    buttonContainer: {
        marginTop: "0.5rem",
        display: "flex",
        gap: "1rem",
        fontSize: "1.2rem",
    },
    approveBtn: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: '8vw',
        fontSize: '1.1rem'
    },
    rejectBtn: {
        backgroundColor: "#f44336",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: '1.1rem',
        width: '8vw'
    },
};

export default AdminAppointments;
