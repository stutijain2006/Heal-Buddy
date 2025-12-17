import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleCardiologyClick = () => {
        navigate("/doctors/cardiology");
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterItems = (items) => {
        if (!searchQuery) return items;
        return items.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerSection}>
                <div style={styles.left}>
                    <div style={styles.backArrow} onClick={() => navigate(-1)}>⬅️</div>
                    <div style={styles.location}>
                        <div style={styles.locationheading} >Select Location </div>
                        <select style={styles.locationSelect}>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                        </select>
                    </div>
                </div>
                <div style={styles.heading}>Doctor Consultation</div>
                <input 
                    placeholder=" 🔍︎ Search Doctors, Specialties, Conditions" 
                    style={styles.searchBar}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div style={styles.consultType}>
                <div style={styles.consultOption}>
                    <img src="/assets/Digital-Consult.png" alt="Consultation" style={styles.consultImage} />
                    <div style={styles.consultText}>Digital Consult</div>
                </div>
                <div style={styles.consultOption}>
                    <img src="/assets/Surgical-Care.png" alt="Video Consultation" style={styles.consultImage} />
                    <div style={styles.consultText}>Surgical Care</div>
                </div>
            </div>

            {filterItems(topSpecialties).length > 0 && (
                <>
                    <h3 style={styles.sectionTitle}>Top Specialties →</h3>
                    <div style={styles.grid}>
                        {filterItems(topSpecialties).map((item) => (
                            <div
                                key={item.name}
                                style={styles.card}
                                onClick={() => item.name === "Cardiology" && handleCardiologyClick()}
                            >
                                <img src={item.icon} alt={item.name} style={styles.icon} />
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {filterItems(commonConditions).length > 0 && (
                <>
                    <h3 style={styles.sectionTitle}>Common Health Conditions →</h3>
                    <div style={styles.grid}>
                        {filterItems(commonConditions).map((item) => (
                            <div key={item.name} style={styles.card}>
                                <img src={item.icon} alt={item.name} style={styles.icon} />
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {filterItems(otherOfferings).length > 0 && (
                <>
                    <h3 style={styles.sectionTitle}>Explore Other Offerings →</h3>
                    <div style={styles.grid}>
                        {filterItems(otherOfferings).map((item) => (
                            <div key={item.name} style={styles.card}>
                                <img src={item.icon} alt={item.name} style={styles.icon} />
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {searchQuery && filterItems([...topSpecialties, ...commonConditions, ...otherOfferings]).length === 0 && (
                <div style={styles.noResults}>
                    No results found for "{searchQuery}"
                </div>
            )}

            <div style={styles.footerCTA}>
                <div style={styles.footerText}>Under the weather?<br />Assess your symptoms, consult experts,<br />and get prescriptions you need—all in one place.</div>
                <button style={styles.getStartedBtn}>Get Started →</button>
            </div>
        </div>
    );
};

const topSpecialties = [
    { name: "General Physician", icon: "/assets/general-physician.png" },
    { name: "Obstetrics & Gynae...", icon: "/assets/gynae.png" },
    { name: "Dermatology", icon: "/assets/dermatology.png" },
    { name: "Orthopedics", icon: "/assets/orthopedics.png" },
    { name: "ENT", icon: "/assets/ent.png" },
    { name: "Cardiology", icon: "/assets/cardiology.png" },
    { name: "Urology", icon: "/assets/Urology.png" },
    { name: "Paediatrics", icon: "/assets/pediatrics.png" },
    { name: "Dentist", icon: "/assets/Dentist.png" },
    { name: "Neurologist", icon: "/assets/Neurologist.png" },
];

const commonConditions = [
    { name: "Dengue/ Malaria", icon: "/assets/dengue.png" },
    { name: "Breathing Problem", icon: "/assets/breathing-problem.png" },
    { name: "Dandruff", icon: "/assets/dandruff.png" },
    { name: "PCOS", icon: "/assets/PCOS.png" },
    { name: "Depression", icon: "/assets/depression.png" },
    { name: "Covid Symptoms", icon: "/assets/covid.png" },
    { name: "Hairfall", icon: "/assets/hairfall.png" },
    { name: "Fever", icon: "/assets/fever.png" },
    { name: "Erectile Dysfunction", icon: "/assets/erectile-dsyfunction.png" },
    { name: "Allergy", icon: "/assets/allergy.png" },
];

const otherOfferings = [
    { name: "Ayurveda", icon: "/assets/ayurveda.png" },
    { name: "Check Symptoms", icon: "/assets/check-symptoms.png" },
    { name: "Call to Book", icon: "/assets/call-to-book.png" },
];

const styles = {
    container: {
        backgroundColor: "#e9f9f8",
        minHeight: "100vh",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        gap: "1rem",
    },
    headerSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        borderBottom: "0.54px solid #ccc",
    },
    backArrow: {
        fontSize: "1.3rem",
        marginRight: "1rem",
        cursor: "pointer"
    },
    left:{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        justifyContent: 'center',
        gap: '0.5rem'
    },
    location: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "0.5rem",
        padding: '0.5rem 0'
    },
    locationheading:{
        fontWeight: "bold",
        color: "#808080"
    },
    locationSelect: {
        padding: "0.5rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        cursor: "pointer",
        fontSize: "1rem",
        backgroundColor: '#E8FBFB',
        color: '#385B4A',
        fontFamily: 'inter bold 500',
        fontWeight: 'bold',
        margin: '0.5rem 0'
    },
    heading: {
        fontWeight: "bold",
        color: "#385B4A",
        fontSize: "1.7rem"
    },
    searchBar: {
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
    consultType: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "1rem 2rem",
        gap: "2rem",
        borderBottom: "0.52px solid #ccc",
    },
    consultOption: {
        padding: "0.5rem",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        justifyContent: "center",
        width: '5vw'
    },
    consultImage: {
        width:'3vw',
        marginBottom: "0.5rem"
    },
    consultText: {
        fontSize: "1rem",  
    },
    sectionTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        margin: '1rem 2rem',
        color: "#385B4A",
        textAlign: "left",
        fontFamily: "inter bold 500"
    },
    grid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "1rem",
        marginBottom: 0,
        borderBottom: "0.52px solid #ccc",
        paddingBottom: 0
    },
    card: {
        margin: "1rem",
        width:'5vw',
        padding: "1rem",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "pointer"
    }, 
    icon: {
        width: "3vw",
        height: "auto",
        marginBottom: "1rem"
    },
    text:{
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#494848",
        fontFamily: "inria sans regular"
    },
    footerCTA: {
        textAlign: "center",
        margin:0,
        padding: 0,
        backgroundColor: 'rgb(87,143,136, 0.5)',
    },
    getStartedBtn: {
        backgroundColor: "#FFFFFF",
        color: "#385B4A",
        padding: "1rem 3rem",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        margin: ' 1rem 0',
        fontSize: "1.2rem"
    },
    footerText:{
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#385B4A",
        fontFamily: "instrument sans bold 500",
        margin: '1rem 0 '
    },
    noResults: {
        textAlign: "center",
        padding: "3rem",
        fontSize: "1.2rem",
        color: "#808080",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold'
    }
};

export default BookAppointment;
