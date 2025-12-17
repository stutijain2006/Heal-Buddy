import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookLabTest = () => {
    const navigate = useNavigate();
    const [testType, setTestType] = useState("Home Test");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState('For Women');

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleTestClick = (testName) => {
        // Convert test name to URL-friendly format
        const testSlug = testName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
        navigate(`/book-lab/${testSlug}`);
    };

    const filterItems = (items) => {
        if (!searchQuery) return items;
        return items.filter(item => 
            (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.label && item.label.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const healthChecks = [
        { name: "Full Body Checkup", icon: "/assets/full-body-checkup.png" },
        { name: "Diabetes", icon: "/assets/diabetes.png" },
        { name: "Women’s Health", icon: "/assets/women-health.png" },
        { name: "Thyroid", icon: "/assets/thyroid.png" },
        { name: "Health Packages", icon: "/assets/health-packages.png" },
        { name: "Fever", icon: "/assets/fever.png" },
        { name: "Vitamin D", icon: "/assets/vitamin-d1.png" },
        { name: "Blood Studies", icon: "/assets/blood-studies.png" },
        { name: "Liver", icon: "/assets/liver.png" },
        { name: "Hairfall", icon: "/assets/hairfall.png" },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.left}>
                    <button onClick={() => navigate("/")} style={styles.backButton}>
                        ⬅️
                    </button>
                    <select
                        value={testType}
                        onChange={(e) => setTestType(e.target.value)}
                        style={styles.dropdown}
                    >
                        <option>📍Choose Location</option>
                        <option>Home Test</option>
                        <option>Lab Center Test</option>
                    </select>
                </div>
                <h2 style={styles.heading}>Lab Testing</h2>
                <input 
                    placeholder=" 🔍︎ Search for Lab Tests" 
                    style={styles.searchBar}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div style={styles.quickActions}>
                {[
                    { label: "Call to Book", description: 'Call Now!', action: () => alert("Calling..."), icon: "/assets/call-to-book1.png" },
                    { label: "Prescript'n Upload", description: 'Book Now', action: () => alert("Upload"), icon: "/assets/upload-prescription.png" },
                    { label: "WhatsApp to Book", description: 'Text Now!', action: () => alert("Text on WhatsApp"), icon: "/assets/whatsapp-to-book.png" },
                    { label: "My Reports", description: 'Explore', action: () => navigate("/my-labs"), icon: "/assets/my-reports.png" },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        style={styles.quickCard}
                        onClick={item.action}
                    >
                        <img src={item.icon} alt={item.icon} style={styles.icon} />
                        <div style={styles.label}>{item.label}</div>
                        <div style={styles.description}>{item.description}</div>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h3 style={styles.heading}>Lab Tests & Packages →</h3>
                {filterItems([
                    { label: "For Women", icon: "/assets/for-women.png" },
                    { label: "For Men", icon: "/assets/for-men.png" },
                    { label: "Lifestyle Checkups", icon: "/assets/lifestyle-checkup.png" },
                    { label: "Special Tests", icon: "/assets/special-tests.png" },
                ]).length > 0 && (
                    <div style={styles.labCategories}>
                        {filterItems([
                            { label: "For Women", icon: "/assets/for-women.png" },
                            { label: "For Men", icon: "/assets/for-men.png" },
                            { label: "Lifestyle Checkups", icon: "/assets/lifestyle-checkup.png" },
                            { label: "Special Tests", icon: "/assets/special-tests.png" },
                        ]).map((item, idx) => (
                            <div key={idx} style={{...styles.categoryCard,
                                borderBottom: item.label=== activeCategory? "4px solid black" : "none"
                            }}
                            onClick= {() => setActiveCategory(item.label)} >
                                <img src={item.icon} alt={item.label} style={styles.categoryIcon} />
                                <div style={styles.categoryText}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {filterItems([
                    { label: "Adult women", icon: "/assets/adult-women.png" },
                    { label: "Senior women", icon: "/assets/senior-women.png" },
                    { label: "Fitness", icon: "/assets/fitness.png" },
                ]).length > 0 && (
                    <div style={styles.womenCategories}>
                        {filterItems([
                            { label: "Adult women", icon: "/assets/adult-women.png" },
                            { label: "Senior women", icon: "/assets/senior-women.png" },
                            { label: "Fitness", icon: "/assets/fitness.png" },
                        ]).map((item, idx) => (
                            <div key={idx} style={styles.categoryCard}>
                                <img src={item.icon} alt={item.label} style={styles.categoryIcon} />
                                <div style={styles.categoryText}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                <button style={styles.exploreBtn}>Explore Packages For Women</button>
            </div>

            <div style={styles.section}>
                <div style={styles.head}>
                    <h3 style={styles.sectionTitle}>Doctor Created Health Checks →</h3>
                    <div style={styles.seeAll}>See All</div>
                </div>
                {filterItems(healthChecks).length > 0 ? (
                    <div style={styles.grid}>
                        {filterItems(healthChecks).map((item) => (
                            <div
                                key={item.name}
                                style={styles.card}
                                onClick={() => handleTestClick(item.name)}
                            >
                                <img src={item.icon} alt={item.name} style={styles.icon} />
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    searchQuery && (
                        <div style={styles.noResults}>
                            No results found for "{searchQuery}"
                        </div>
                    )
                )}
            </div>

            <div style={styles.offerBox}>
                <div style={styles.offerhead}>
                    <h4 style={styles.offerHeading}>Need Multiple Tests?</h4>
                    <div style={styles.allArrow}>→</div>
                </div>
                <div style={styles.offerContent}>Let’s create the right package for you</div>
                <div style={styles.offerContent}>Get up to 70% off with our Lab Test Packages</div>
            </div>

            <div style={styles.footerLink} onClick={() => navigate("/my-labs")}>
                <img src="/assets/reports.png" alt="My Reports" style={styles.reportsicon} />
                View Reports in My Orders →
            </div>
        </div>
    );
};

const styles = {
    container: { padding: 20, fontFamily: "sans-serif", background: "#E8FBFB" },
    header: {
        display: "flex",
        alignItems: "center",
        gap: '1rem',
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        borderBottom: "0.54px solid #ccc",
    },
    backButton: {
        fontSize: "1.3rem",
        marginRight: "1rem",
        cursor: "pointer",
        border: "none",
        background: "transparent",
    },
    dropdown: {
        padding: 6,
        borderRadius: 4,
        backgroundColor: "#E8FBFB",
        color: "#385B4A",
        border: "1px solid #ccc",
        cursor: "pointer",
        margin: "0.5rem",
        fontSize: "0.9rem",
        fontFamily: "inter bold 500",
        fontWeight: "bold",
    },
    heading: {
        fontWeight: "bold",
        color: "#385B4A",
        fontSize: "1.7rem",
        margin: "1rem",
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
    quickActions: {
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        margin: "2rem",
        gap: "3.5rem",
        padding: "1rem",
        borderBottom: "0.52px solid #ccc",
    },
    quickCard: {
        padding: '0.5rem',
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "0.54px solid rgb(56,91,74,0.25)",
        width: '7vw'
    },
    icon: {
        width: "4vw",
        height: "auto",
        marginBottom: "1rem"
    },
    label: {
        fontSize: "1.1rem",
        fontWeight: "bold",
        color: "#385B4A",
        fontFamily: "inter semi bold 600",
        marginBottom: "0.35rem",
        fontWeight: "bold"
    },
    description: {
        fontSize: "0.9rem",
        color: "#3B22CE",
        fontFamily: "inter regular 400",
        fontWeight: "bold"
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
        width: '5vw',
        padding: "1rem",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "pointer"
    },
    section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "2rem",
        borderBottom: "0.52px solid #ccc",
        paddingBottom: 0,
        textAlign: "left",
        justifyContent: 'flex-start'
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        width: '100%',
    },
    seeAll: {
        fontSize: '0.9rem',
        fontFamily: 'inter regular 400',
        color: '#3B22CE',
        cursor: 'pointer'
    },
    labCategories: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem", 
        gap: "3rem",
        width: '70%',
        borderBottom: "0.52px solid #ccc",
        paddingBottom: '1rem'
    },
    womenCategories:{
        display : 'flex',
        alignItems: "center",
        justifyContent: 'center',
        margin: "1rem", 
        gap: "2rem",
    },
    categoryCard: {
        padding: '1rem',
        borderRadius: 8,
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        width: '7vw'
    },
    categoryIcon :{
        width: "4.5vw",
        height: "auto",
        marginBottom: "0.5rem"
    },
    categoryText:{
        fontSize: "1.1rem",
        fontWeight: "semi bold",
        color: "#385B4A",
        fontFamily: "inter semi bold 600"
    },
    exploreBtn: {
        margin: '1rem',
        padding: '0.5rem 2.5rem',
        background: "rgb(56,91,74,0.6)",
        border: "none",
        color: "white",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: '1.1rem',
        fontFamily:'inter bold 500',
        fontWeight: 'bold',
        width: '60%',
        textAlign: 'center'
    },
    checkCard: {
        flex: "1 0 30%",
        padding: 10,
        borderRadius: 8,
        background: "#fff",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    offerBox: {
        padding: '0.5rem',
        background: "rgb(87,143,135,0.5)",
        borderRadius: 10,
        textAlign: "left",
        margin: '0 1rem',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    offerhead: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        color: '#FFFFFF',
        fontFamily: 'inter bold 500',
        fontWeight: 'bold',
        fontSize: '1.9rem',
        margin: '0 0.5rem',
        paddingBottom: 0
    },
    offerContent: {
        color: "#FFFFFF",
        fontSize: "1.35rem",
        margin: ' 0 0.5rem 1rem 0.5rem',
        fontFamily: 'inria sans regular 400',
        letterSpacing: 0.4,
        paddingTop: 0
    },
    allArrow: {
        fontSize: "1.7rem",
        marginRight: "1.7rem",
        cursor: "pointer"
    },
    footerLink: {
        margin: '1.5rem',
        textAlign: "left",
        cursor: "pointer",
        fontWeight: "bold",
        color: '#385B4A',
        fontFamily: 'inter bold 500',
        fontSize: '1.1rem',
        border: '0.54px solid #ccc',
        padding: '0.7rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
    },
    reportsicon: {
        width: '2.5vw',
        height: 'auto',
        marginRight: '1rem'
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

export default BookLabTest;
