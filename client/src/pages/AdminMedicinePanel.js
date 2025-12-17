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
            const ordersData = Array.isArray(response.data) ? response.data : [];
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching medicine orders", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'approved': return '#4CAF50';
            case 'rejected': return '#f44336';
            case 'pending': return '#ff9800';
            default: return '#808080';
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
                        <p><strong>Patient Name:</strong> {order.User?.fullname || 'N/A'}</p>
                        <p><strong>Medicines:</strong> {order.medicines}</p>
                        <p><strong>Quantity:</strong> {order.quantity || 'N/A'}</p>
                        <p><strong>Delivery Address:</strong> {order.deliveryAddress || 'N/A'}</p>
                        <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
                        <p><strong>Status:</strong> 
                            <span style={{...styles.statusBadge, backgroundColor: getStatusColor(order.status)}}>
                                {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                            </span>
                        </p>
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
    statusBadge: {
        display: 'inline-block',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        marginLeft: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    },
};


export default AdminMedicineOrders;