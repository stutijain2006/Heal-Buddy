import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";

const MedicineOrder = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filterItems = (items) => {
        if (!searchQuery) return items;
        return items.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const healthConditions = [
        { name: "Diabetes Care", img: "/assets/diabetes-care.png" },
        { name: "Cardiac Care", img: "/assets/cardiac-care.png" },
        { name: "Stomach Care", img: "/assets/stomach-care.png" },
        { name: "Pain Relief", img: "/assets/pain-relief.png" },
        { name: "Liver Care", img: "/assets/liver-care.png" },
        { name: "Oral Care", img: "/assets/oral-care.png" },
        { name: "Respiratory", img: "/assets/respiratory.png" },
        { name: "Sexual Health", img: "/assets/sexual-health.png" },
        { name: "Elderly Care", img: "/assets/elderly-care.png" },
        { name: "Cold & Immunity", img: "/assets/cold.png" },
    ];
    const brands = [
        {name: 'Nivea', img: '/assets/nivea.png'},
        {name: 'Aveeno', img: '/assets/aveeno.png'},
        {name: 'Volini', img: '/assets/volini.png'},
        {name: 'Revital', img: '/assets/revital.png'},
        {name: 'MamyPoko', img: '/assets/mamypoko.png'},
    ];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.backArrow} onClick={() => navigate("/")}>⬅️</div>
                <div style={styles.addressDropdown}>
                    <select style={styles.addressSelect}>
                        <option>Select Address</option>
                        <option>123 Street, Delhi</option>
                        <option>456 Avenue, Mumbai</option>
                    </select>
                </div>
                <h2 style={styles.heading}>Order Medicines</h2>
                <div style={styles.headerright}>
                    <div>➤</div>
                    <div>🛒</div>
                </div>
            </div>

            <div style={styles.searchSection}>
                <div><img src="/assets/doctor.png" alt="Search" style={styles.searchimages} /></div>
                <div style={styles.searchbar}>
                    <div style={styles.searchHeading}> Buy Medicines and Essentials</div>
                    <div style={styles.searchoption}>
                        <input
                            type="text"
                            placeholder="🔍︎ Search by Health Condition or Brand"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
                <div><img src="/assets/doctor1.png" alt="Search" style={styles.searchimages} /></div>
            </div>

            <div style={styles.categorySection}>
                <div style={styles.categoryItem}>
                    <div style={styles.categoryImage}>🏪</div>
                    <div style={styles.categorycontent}>
                        <div style={styles.categoryHeading}>Pharmacy near Me</div>
                        <div> Find Store</div>
                    </div>
                    <div style={styles.categoryImage}>➡️</div>
                </div>
                <div style={styles.categoryItem}>
                    <div style={styles.categoryImage}>📝</div>
                    <div style={styles.categorycontent}>
                        <div style={styles.categoryHeading}>Get 20% off on Medicines</div>
                        <div> Upload Now</div>
                    </div>
                    <div style={styles.categoryImage}>➡️</div>
                </div>
                <div style={styles.categoryItem}>
                    <div style={styles.categoryImage}>🏪</div>
                    <div style={styles.categorycontent}>
                        <div style={styles.categoryHeading}>Doctor Appointment</div>
                        <div> Book Now</div>
                    </div>
                    <div style={styles.categoryImage} onClick={() => navigate("/book-appointment")}>➡️</div>
                </div>
                <div style={styles.categoryItem}>
                    <div style={styles.categoryImage}>🛡️</div>
                    <div style={styles.categorycontent}>
                        <div style={styles.categoryHeading}>Health Insurance</div>
                        <div> Explore Plans</div>
                    </div>
                    <div style={styles.categoryImage}>➡️</div>
                </div>
                <div style={styles.categoryItem}>
                    <div style={styles.categoryImage}>💉</div>
                    <div style={styles.categorycontent}>
                        <div style={styles.categoryHeading}>Booking Lab Tests</div>
                        <div> At Home</div>
                    </div>
                    <div style={styles.categoryImage} onClick={() => navigate("/book-lab")}>➡️</div>
                </div>
            </div>

            {filterItems(healthConditions).length > 0 && (
                <div style={styles.categorySection1}>
                    <h3 style={styles.sectionHeading}>Browse by Health Conditions</h3>
                    <div style={styles.categoryList}>
                    {filterItems(healthConditions).map((cond) => (
                        <div
                            key={cond.name}
                            style={styles.categoryItem}
                            onClick={() => {
                                const categorySlug = cond.name.toLowerCase().replace(/\s+/g, '-');
                                navigate(`/order-medicine/${categorySlug}`);
                            }}
                        >
                                <img
                                    src={cond.img}
                                    alt={cond.name}
                                    style={styles.categoryImage}
                                />
                                <div>{cond.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filterItems(brands).length > 0 && (
                <div style={styles.categorySection1}>
                    <h3 style={styles.sectionHeading}>Shop by Brand</h3>
                    <div style={styles.categoryList}>
                        {filterItems(brands).map((cond) => (
                            <div
                                key={cond.name}
                                style={styles.categoryItem}
                            >
                                <img
                                    src={cond.img}
                                    alt={cond.name}
                                    style={styles.categoryImage}
                                />
                                <div>{cond.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {searchQuery && filterItems([...healthConditions, ...brands]).length === 0 && (
                <div style={styles.noResults}>
                    No results found for "{searchQuery}"
                </div>
            )}

        </div>
    );
};

const styles = {
    body:{
        margin: 0,
        padding: 0,
        height: '100%'
    },
    container: {
        backgroundColor: "#E8FBFB",
        minHeight: "100vh",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        fontFamily: "inter bold 500",
        width: '100%'
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
    addressDropdown: {
        marginLeft: "1rem",
    },
    addressSelect: {
        padding: "0.5rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontWeight: "bold",
        backgroundColor: "#E8FBFB",
        color: "#385B4A",
        fontSize: "1rem",
    },
    heading: {
        flexGrow: 1,
        textAlign: "center",
        color: "#385B4A",
        fontWeight: "bold",
        fontSize: "1.9rem",
        margin: "1rem",
        textAlign: 'center'
    },
    headerright: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '1.5rem',
        fontSize: '1.5rem',
        border: 'none',
        background: 'transparent',
        marginRight: '1rem'
    },
    searchSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: "2rem",
        gap: "1rem",
        backgroundColor: '#385B4A',
        padding: '2rem',
    },
    searchimages: {
        width: "11rem",
        height: "auto",
        objectFit: "cover",
        margin: "1rem",
    },
    searchbar: {
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        padding: '0 2rem',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchHeading: {
        color: '#ffffff',
        fontSize: '1.7rem',
        fontWeight: 'bold',
        fontFamily: 'inter bold 500',
    },
    searchInput: {
        padding: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        width: "50%",
        marginRight: "1rem",
        backgroundColor: "#E8FBFB",
        fontSize: "1.1rem",
        color: "#385B4A",
    },
    searchButton: {
        padding: "1rem 2rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#ffffff",
        color: "#385B4A",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1.1rem",
    },
    categorySection: {
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        gap: '1rem',
    },
    sectionHeading: {
        fontWeight: "bold",
        fontSize: "1.6rem",
        color: "#385B4A",
        marginBottom: "0.5rem",
    },
    categoryItem: {
        padding: "0.8rem",
        borderRadius: "8px",
        margin: "0.5rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        textAlign: 'left',
        gap: '1rem',
        border: '0.52px solid #ccc',
        width: '15vw',
        height: '15vh',
    },
    categorycontent: {
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'left',
        gap: '0.3rem',
        flexDirection: 'column',
        fontSize: '1.1rem',
        color: "#808080",
    },
    categoryImage: {
        objectFit: "cover",
        fontSize: "1.5rem",
        marginRight: "0.5rem",
        width: '3rem',
        height:'auto'
    },
    categoryHeading: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#385B4A",
    },
    categorySection1: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexDirection: 'column',
        textAlign: 'left',
        margin: '2rem'
    },
    categoryList: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: 'center',
        gap: '0.5rem',
        textAlign: 'left',
        fontSize: '1.2rem',
        padding: '0.3rem',
        margin: '0 1rem',
        flexWrap: 'wrap',
        maxWidth: '100%',
        overflow: 'hidden'
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

export default MedicineOrder;
