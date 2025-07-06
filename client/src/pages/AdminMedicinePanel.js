import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMedicineOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:5000/api/admin/medicine-orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching medicine orders", error);
        }
    };

    const handleStatusChange = async (id, status) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/admin/medicine-orders/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchOrders();
        } catch (error) {
            console.error("Error updating medicine order", error);
        }
    };

     return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Manage Medicine Orders</h2>
            {Array.isArray(orders) && orders.length === 0 ? (
                <p>No medicine orders found</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={styles.card}>
                        <p><strong>ID:</strong> {order.id}</p>
                        <p><strong>Medicines:</strong> {order.medicines}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <div style={styles.buttonContainer}>
                            <button
                                onClick={() => handleStatusChange(order.id, "approved")}
                                style={styles.approveBtn}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusChange(order.id, "rejected")}
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


export default AdminMedicineOrders;