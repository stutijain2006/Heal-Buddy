import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchId, setSearchId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:5000/api/appointments", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppointments(response.data.appointments);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointments();
    }, []);

    const filteredAppointments = Array.isArray(appointments) ?appointments.filter((app) =>
        app.id.toString().includes(searchId)):[];

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.backArrow} onClick={() => navigate("/profile")}> ⬅️ </div>
                <h2 style={styles.heading}>My Appointments</h2>
                <input
                    type="text"
                    placeholder=" 🔍︎ Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.appointmentList}>
                {filteredAppointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    filteredAppointments.map((app) => (
                        <div key={app.id} style={styles.appointmentCard}>
                            <div style={styles.appointmentDetails}>
                                <div style={styles.appointmentId}>Appointment ID: {app.id}</div>
                                <div style={styles.doctorName}>{app.doctorName}</div>
                                <div style={styles.dateTime}>{app.appointmentDate} | {app.timeSlot}</div>
                                <div style={{
                                    ...styles.status,
                                    color: app.status === "approved" ? "green" : app.status === "rejected" ? "red" : "orange"
                                }}>
                                    {app.status.toUpperCase()}
                                </div>
                            </div>

                            <div 
                                style={styles.backArrow}
                                onClick={() => console.log("View details of appointment ID:", app.id)}>➡️</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "#E8FBFB",
        minHeight: "100vh",
        margin: "0",
        boxSizing: "border-box",
    },
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
        padding: "1rem",
    },
    backArrow: {
        fontSize: "1.3rem",
        marginRight: "1rem",
        cursor: "pointer",
        border: "none",
        background: "transparent",
    },
    heading: {
        fontWeight: "bold",
        color: "#385B4A",
        fontSize: "1.7rem",
        margin: "1rem",
    },
    searchInput: {
        padding: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginRight: "1rem",
        fontSize: "1rem",
        backgroundColor: '#E8FBFB',
        color: '#385B4A',
        fontFamily: 'inter bold 500',
        fontWeight: 'bold',
        width: '15%'
    },
    searchIcon: {
        marginLeft: "8px",
        verticalAlign: "middle"
    },
    appointmentList: {
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:'space-around'
    },
    appointmentCard: {
        border: "0.52px solid rgb(128,128,128,0.2)",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
    appointmentId: {
        fontSize: "1.2rem",
        color: "#888",
        fontWeight:'semibold'
    },
    doctorName: {
        fontWeight: "bold",
        fontSize: "1.35rem",
        marginBottom: "0.5rem",
        color: '#385B4A'
    },
    dateTime: {
        color: "#444"
    },
    status: {
        marginTop: "0.5rem",
        fontWeight: "500",
        fontSize: "1.2rem",
    },
    appointmentDetails: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        fontSize: "0.9rem",
        color: "#385B4A",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold'
    }
};

export default MyAppointments;
