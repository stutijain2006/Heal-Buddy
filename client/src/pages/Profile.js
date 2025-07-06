import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({
        fullname: "",
        mobile: "",
        address: "",
        createdAt: ""
    });

    const navigate = useNavigate();
    const handleClose = () => {
        navigate("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchUser();
        }
    }, [navigate]);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const { fullname, mobile, address, createdAt } = response.data;
            setUser({ fullname, mobile, address, createdAt });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.sidebarWrapper}>
                <div style={styles.closeBtn} onClick={handleClose}>✖</div>
                <div style={styles.header}>Profile</div>
                <div style={styles.card}>
                    <img
                        src="/assets/profile-image.png"
                        alt="User"
                        style={styles.avatar}
                    />
                    <div style={styles.userInfo}>
                        <div style={styles.name}>{user.fullname}</div>
                        <div>📅 {new Date(user.createdAt).toLocaleDateString()}</div>
                        <div>📞 {user.mobile}</div>
                    </div>
                    <img src='/assets/edit-pen.png' alt='Edit Pen' style={styles.editPen} />
                </div>

                <div style={styles.option}>
                    <div>📍 Address Details</div>
                    <div style={styles.optionText}>Edit, Add and Manage your address details.</div>
                </div>

                <div style={styles.Profileoptions}>
                    <Link to="/my-appointments" style={styles.option}>
                        <div>📅 Appointments</div>
                        <div style={styles.optionText}>View and manage appointments</div>
                    </Link>

                    <Link to="/my-medicines" style={styles.option}>
                        <div>💊 Medicine Orders</div>
                        <div style={styles.optionText}>Order history and transactions</div>
                    </Link>

                    <Link to="/my-labs" style={styles.option}>
                        <div>🧪 Lab Test </div>
                        <div style={styles.optionText}>Lab history and reports </div>
                    </Link>

                    <div style={styles.logout} onClick={handleLogout}>Logout [→]</div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 999,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.3s ease"
    },
    sidebarWrapper: {
        width: "60%",
        maxWidth: 400,
        backgroundColor: "#e9f9f8",
        padding: "1.5rem",
        height: "100vh",
        boxShadow: "-4px 0 10px rgba(0,0,0,0.2)",
        overflowY: "auto",
        animation: "slideIn 0.3s ease-out",
        position: "relative",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px"
    },
    closeBtn: {
        position: "absolute",
        top: "1.2rem",
        right: "1.5rem",
        fontSize: "1.3rem",
        cursor: "pointer",
        color: "#333"
    },
    header: {
        fontSize: "1.7rem",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "1rem",
        color: '#385B4A',
        fontFamily: "inria serif bold 500"
    },
    card: {
        padding: "1rem",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
        border: "1px solid rgb(56,91,74,0.20)",
    },
    avatar: {
        width: '5.5vw',
        height: 'auto',
    },
    userInfo: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        alignItems: 'flex-start',
        fontSize: '1.1rem',
    },
    name: {
        fontWeight: "bold",
        fontSize: "1.3rem",
        color: "#4B49AC",
        fontFamily: "inria serif regular 400",
        marginBottom: "0.5rem"
    },
    option: {
        padding: "1rem",
        borderRadius: "10px",
        marginBottom: "0.75rem",
        textAlign: "left",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems:'flex-start',
        border: "1px solid rgb(56,91,74,0.20)",
        borderRadius: "10px",
        width: "90%",
        fontSize: "1.2rem",
        fontFamily: "inria serif regular 400",
        fontWeight: "bold",
        color: '#385B4A'
    },
    optionText: {
        fontSize: "1rem",
        fontWeight: "normal",
        marginTop: "0.7rem",
        color: "#385B4A"
    },
    Profileoptions:{
        marginBottom:'0.75rem',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    logout: {
        color: "#3B22CE",
        textAlign: "right",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "1rem",
        fontSize: "1.2rem"
    }
};

export default Profile;
