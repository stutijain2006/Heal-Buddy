import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cardiology = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        doctorName: "",
        appointmentDate: "",
        timeSlot: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBook = async (doctorName) => {
        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:5000/api/appointments", {
                doctorName,
                appointmentDate: form.appointmentDate,
                timeSlot: form.timeSlot
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Appointment Requested. Awaiting Admin Approval.");
        } catch (error) {
            console.error(error);
        }
    };

    const doctors = [
        {
            name: "Dr. Anil Saxena",
            hospital: "CHAIRMAN CARDIOLOGY |Fortis Okhla",
            specialization: "Cardiac Sciences | Electrophysiology",
            experience: "35 Years",
            fee: "₹2000",
            image: "/assets/doc1.png"
        },
        {
            name: "Dr. Balbir Singh",
            hospital: "GROUP CHAIRMAN |Max Saket",
            specialization: "Cardiac Sciences | Interventional Cardiology",
            experience: "33 Years",
            fee: "₹2500",
            image: "/assets/doc2.png"
        },
        {
            name: "Dr. Ashok Seth",
            hospital: "CHAIRMAN CARDIAC SCIENCE |Fortis Okhla",
            specialization: "Cardiac Sciences | Interventional Cardiology",
            experience: "40 Years",
            fee: "₹5000",
            image: "/assets/doc3.png"
        },
        {
            name: "Dr. T.S. Kler",
            hospital: "CHAIRMAN & HOD |Max Dwarka",
            specialization: "Cardiac Sciences | Electrophysiology",
            experience: "37 Years",
            fee: "₹2500",
            image: "/assets/doc4.png"
        },
        {
            name: "Dr. Tripti Deb",
            hospital: "CHAIRMAN CARDIOLOGY |Apollo Hospital, Delhi",
            specialization: "Cardiac Sciences | Electrophysiology",
            experience: "40 Years",
            fee: "₹550",
            image: "/assets/doc5.png"
        }
    ];

    return (
        <div style={{ backgroundColor: "#E8FBFB", minHeight: "100vh", padding: "1rem" }}>
            <div style={styles.Heading}>
                <button onClick={() => navigate(-1)} style={styles.backArrow}>⬅️</button>
                <h2 style={styles.head}>Cardiology</h2>
                <input placeholder="Search by Doctor" style={styles.input} />
            </div>

            <div style={styles.filtersRow}>
                <select style={styles.select}>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                </select>
                <select style={styles.select}>
                    <option>Digital Consult</option>
                    <option>Offline Visit</option>
                </select>
                <select style={styles.select}>
                    <option disabled selected>Filter</option>
                    <outgroup label="Fees">
                        <option value="fees-500">Less than ₹500</option>
                        <option value="fees-500-1000">₹500 - ₹1000</option>
                        <option value="fees-1000">More than ₹1000</option>
                    </outgroup>
                    <optgroup label="Experience">
                        <option value="exp-5">Less than 5 years</option>
                        <option value="exp-5-10">5 - 10 years</option>
                        <option value="exp-10">More than 10 years</option>
                    </optgroup>
                    <option value="all">All</option>
                </select>
            </div>

            <div style={styles.head2}>Best Cardiologists in Delhi →</div>
            <div>
                {doctors.map((doc, idx) => (
                    <div key={idx} style={styles.doctorCard}>
                        <img src={doc.image} alt={doc.name} style={styles.image} />
                        <div>
                            <div style={styles.name}>{doc.name}</div>
                            <div style={styles.hospital}>{doc.hospital}</div>
                            <div>{doc.specialization}</div>
                            <div style={styles.experience}>
                                <div>{doc.experience}</div>
                                <div style={styles.fee}>{doc.fee}</div>
                            </div>
                            <input type="date" name="appointmentDate" onChange={handleChange} style={styles.input} />
                            <select name="timeSlot" onChange={handleChange} style={styles.input}>
                                <option value="">Select Time Slot</option>
                                <option value="10:00 AM">10:00 AM - 11:00 AM</option>
                                <option value="11:00 AM">11:00 AM- 12:00 PM</option>
                                <option value="12:00 PM">12:00 PM- 1:00 PM </option>
                                <option value="1:00 PM">1:00 PM- 2:00 PM</option>
                                <option value="2:00 PM">2:00 PM- 3:00 PM</option>
                                <option value="3:00 PM">3:00 PM- 4:00 PM</option>
                            </select>
                            <button onClick={() => handleBook(doc.name)} style={styles.bookBtn}>Book Appointment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    filtersRow: {
        display: "flex",
        gap: "1rem",
        marginTop: "0.5rem"
    },
    Heading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        borderBottom: "0.54px solid #ccc"
    },
    backArrow: {
        cursor: "pointer",
        fontSize: "1.3rem",
        marginRight: "1rem",
        border: "none",
        backgroundColor: "transparent"
    },
    head: {
        fontSize: "1.75rem",
        fontWeight: "bold",
        color: "#385B4A",
        fontFamily: "inria sans bold 500"
    },
    input: {
        padding: "0.5rem 1rem",
        margin: "0.5rem 1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: '#E8FBFB',
        color: '#385B4A',
        fontSize: "1rem",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold'
    },
    head2: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: "#385B4A",
        fontFamily: "inria sans bold 500",
        margin: "1rem",
        textAlign: "left"
    },
    filtersRow: {
        display: "flex",
        gap: "1rem",
        margin: "0.5rem",
        borderBottom: "0.54px solid #ccc"
    },
    select: {
        padding: "0.7rem",
        borderRadius: "8px",
        margin: '1rem',
        backgroundColor: '#E8FBFB',
        color: '#385B4A',
        fontSize: "1rem",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold',
    },
    doctorCard: {
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        border: "0.52px solid #ccc",
        borderRadius: "12px",
        marginBottom: "1rem",
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        textAlign: "left",
        fontSize: "0.9rem",
        color: "#385B4A",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold'
    },
    image: {
        width: "10vw",
        borderRadius: "12px",
        marginRight: "2rem"
    },
    name: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        color: "#385B4A",
        fontFamily: 'inter bold 500',
    },
    hospital: {
        color: "#808080",
        marginBottom: "0.5rem",
        fontSize: "1.1rem",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold'
    },
    experience: {
        color: "#3B22CE",
        marginTop: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "2.5rem",
        fontSize: '1rem'
    },
    fee: {
        color: "green",
        fontWeight: "bold"
    },
    bookBtn: {
        marginTop: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "rgb(56,91,74,0.6)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold'
    }
};

export default Cardiology;
