import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLabTests = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetchLabTests();
    }, []);

    const fetchLabTests = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:5000/api/lab-tests/admin", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data);
            setTests(response.data);
        } catch (error) {
            console.error("Error fetching lab tests", error);
        }
    };

    const handleStatusChange = async (id, status) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/lab-tests/admin/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLabTests();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Manage Lab Test Bookings</h2>
            {Array.isArray(tests) && tests.length === 0 ? (
                <p>No lab test bookings found</p>
            ) : (
                tests.map(test => (
                    <div key={test.id} style={styles.card}>
                        <p><strong>ID:</strong> {test.id}</p>
                        <p><strong>Test:</strong> {test.testName}</p>
                        <p><strong>Date:</strong> {test.date}</p>
                        <p><strong>Status:</strong> {test.status}</p>
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={() => handleStatusChange(test.id, "approved")}
                                style={styles.approveBtn}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusChange(test.id, "rejected")}
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
        gap: "1rem",
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

export default AdminLabTests;
