import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const MyLabTests = () => {
    const [tests, setTests] = useState([]);
    const [searchId, setSearchId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:5000/api/lab-tests", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTests(response.data);
            } catch (error) {
                alert("Error fetching lab tests");
            }
        };
        fetchTests();
    }, []);

    const filteredTests = tests.filter((test) =>
        test.id.toString().includes(searchId)
    );

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.backArrow} onClick={() => navigate("/profile")}>⬅️</div>
                <h2 style={styles.heading}>My Lab Tests</h2>
                <input
                    type="text"
                    placeholder="🔍︎ Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.testList}>
                {filteredTests.length === 0 ? (
                    <p>No lab tests found.</p>
                ) : (
                    filteredTests.map((test) => (
                        <div key={test.id} style={styles.testCard}>
                            <div style={styles.testDetails}>
                                <div style={styles.testId}>Test ID: {test.id}</div>
                                <div style={styles.testName}>{test.testName}</div>
                                <div style={styles.dateTime}>{test.testDate} | Mode: {test.mode}</div>
                                <div style={{
                                    ...styles.status,
                                    color: test.status === "approved" ? "green" : test.status === "rejected" ? "red" : "orange"
                                }}>
                                    {test.status.toUpperCase()}
                                </div>
                                {test.resultUrl && (
                                    <a
                                        href={test.resultUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.resultLink}
                                    >
                                        View Result
                                    </a>
                                )}
                            </div>
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
        padding: "1rem",
        marginBottom: "1rem",
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
        width: '15%'
    },
    testList: {
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    testCard: {
        border: "0.52px solid rgba(128,128,128,0.2)",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        width: "80%",
        textAlign: "left",
    },
    testDetails: {
        fontFamily: 'inter bold 500',
        fontWeight: 'bold',
        color: "#385B4A",
    },
    testId: {
        fontSize: "1.2rem",
        color: "#888",
        marginBottom: "0.5rem",
    },
    testName: {
        fontWeight: "bold",
        fontSize: "1.35rem",
        marginBottom: "0.5rem",
    },
    dateTime: {
        color: "#444",
        marginBottom: "0.5rem",
    },
    status: {
        fontWeight: "500",
        fontSize: "1.2rem",
        marginBottom: "0.5rem",
    },
    resultLink: {
        color: "#4B49AC",
        fontWeight: "bold",
        textDecoration: "none",
    }
};

export default MyLabTests;
