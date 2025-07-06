import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyMedicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchId, setSearchId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicines = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:5000/api/medicine-orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMedicines(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMedicines();
    }, []);

    const filteredMedicines = medicines.filter((med) =>
        med.id.toString().includes(searchId)
    );

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.backArrow} onClick={() => navigate("/profile")}> ⬅️ </div>
                <h2 style={styles.heading}>My Medicines</h2>
                <input
                    type="text"
                    placeholder=" 🔍︎ Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.medicineList}>
                {filteredMedicines.length === 0 ? (
                    <p>No medicine orders found.</p>
                ) : (
                    filteredMedicines.map((med) => (
                        <div key={med.id} style={styles.medicineCard}>
                            <div style={styles.medicineDetails}>
                                <div style={styles.medicineId}>Order ID: {med.id}</div>
                                <div style={styles.medicineName}>Medicines: {med.medicines}</div>
                                <div style={styles.dateTime}>Quantity: {med.quantity}</div>
                                <div style={styles.deliveryAddress}>Address: {med.deliveryAddress}</div>
                                <div style={{
                                    ...styles.status,
                                    color: med.status === "approved" ? "green" : med.status === "rejected" ? "red" : "orange"
                                }}>
                                    {med.status?.toUpperCase()}
                                </div>
                            </div>

                            <div
                                style={styles.backArrow}
                                onClick={() => console.log("View details of order ID:", med.id)}>➡️</div>
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
    medicineList: {
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-around'
    },
    medicineCard: {
        border: "0.52px solid rgb(128,128,128,0.2)",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
    medicineId: {
        fontSize: "1.2rem",
        color: "#888",
        fontWeight: 'semibold'
    },
    medicineName: {
        fontWeight: "bold",
        fontSize: "1.35rem",
        marginBottom: "0.5rem",
        color: '#385B4A'
    },
    dateTime: {
        color: "#444"
    },
    deliveryAddress: {
        color: "#444",
        marginTop: "0.4rem",
        fontSize: "0.9rem",
    },
    status: {
        marginTop: "0.5rem",
        fontWeight: "500",
        fontSize: "1.2rem",
    },
    medicineDetails: {
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

export default MyMedicines;
