import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MedicineCategory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("");
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [prescriptions, setPrescriptions] = useState({});
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState("Delhi");

    useEffect(() => {
        fetchMedicines();
    }, [selectedLocation, category]);

    const fetchMedicines = async () => {
        setLoading(true);
        try {
            const params = {
                category: category?.replace(/-/g, ' ') || "Medicine",
                location: selectedLocation
            };
            const response = await axios.get("http://localhost:5000/api/medicines", {
                params
            });
            setMedicines(response.data.medicines || []);
        } catch (error) {
            console.error("Error fetching medicines:", error);
            console.error("Error details:", error.response?.data || error.message);
            setMedicines([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (medicineId, file) => {
        setPrescriptions((prev) => ({
            ...prev,
            [medicineId]: file,
        }));
    };

    const handleBuy = async (medicine) => {
        const token = localStorage.getItem("token");
        try {
            const formData = new FormData();
            formData.append("medicines", medicine.name);
            formData.append("quantity", 1);
            formData.append("deliveryAddress", "Default Address");

            if (prescriptions[medicine.id]) {
                formData.append('prescription', prescriptions[medicine.id])
            }

            await axios.post("http://localhost:5000/api/medicine-orders", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(`Successfully ordered ${medicine.name}`);
        } catch (error) {
            console.error("Order failed", error);
            alert("Order failed. Please try again.");
        }
    };

    const categoryDisplayName = category?.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Medicine';

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.backArrow} onClick={() => navigate("/order-medicine")}>⬅️</div>
                <div style={styles.addressDropdown}>
                    <select 
                        style={styles.addressSelect}
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                    </select>
                </div>
                <h2 style={styles.heading}>{categoryDisplayName}</h2>
                <div style={styles.headerright}>
                    <div>➤</div>
                    <div>🛒</div>
                </div>
            </div>

            <div style={styles.sortFilterSection}>
                <select style={styles.sortOptions} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Sort By: Relevance</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>
                <select style={styles.sortOptions} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">Filter: All</option>
                    <option value="devices">Devices</option>
                    <option value="powder">Nutrition Powder</option>
                </select>
                <input
                    type="text"
                    placeholder="🔍︎ Search Medicines"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.medicineList}>
                {loading ? (
                    <div style={styles.noResults}>Loading medicines...</div>
                ) : medicines
                    .filter(med => 
                        med.name.toLowerCase().includes(search.toLowerCase()) ||
                        (med.description && med.description.toLowerCase().includes(search.toLowerCase()))
                    )
                    .length === 0 ? (
                    <div style={styles.noResults}>
                        {search ? `No medicines found matching "${search}"` : `No medicines available in ${selectedLocation}`}
                    </div>
                ) : (
                    medicines
                    .filter(med => 
                        med.name.toLowerCase().includes(search.toLowerCase()) ||
                        (med.description && med.description.toLowerCase().includes(search.toLowerCase()))
                    )
                    .map(med => (
                        <div key={med.id} style={styles.medicineCard}>
                            <img src={med.image} alt={med.name} style={styles.medicineImage} />
                            <div style={styles.medicineInfo}>
                                <div style={styles.medicineName}>{med.name}</div>
                                <div style={styles.medicineDesc}>{med.description}</div>
                                <div style={styles.medicinePrice}>₹{typeof med.price === 'number' ? med.price.toFixed(0) : med.price}</div>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={(e) => handleFileChange(med.id, e.target.files[0])}
                                    style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '0.8rem', position: 'absolute', bottom: '10%', left: '10%', width: '80%' }} />
                                <button onClick={() => handleBuy(med)} style={styles.buyButton}>Buy Now</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { backgroundColor: "#E8FBFB", minHeight: "100vh", padding: "1rem" },
    navbar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" },
    backArrow: {
        fontSize: "1.3rem",
        marginRight: "1rem",
        cursor: "pointer",
        border: "none",
        background: "transparent",
    },
    addressDropdown: {
        marginLeft: "1rem"
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
    searchInput: {
        padding: "0.8rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "50%",
        fontSize: "1.1rem",
        backgroundColor: "#E8FBFB",
        color: "#385B4A"
    },
    sortFilterSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
        gap: "2rem",
    },
    sortOptions: {
        padding: "0.8rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "#E8FBFB",
        color: "#385B4A",
        fontSize: "1rem",
        width: '15%'
    },
    medicineList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        margin: '2rem 1rem'
    },
    medicineCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "15rem",
        padding: "1rem",
        borderRadius: "12px",
        border: "0.52px solid #808080",
        textAlign: 'left',
        position: 'relative'
    },
    medicineImage: {
        width: "100%",
        height: "auto",
        objectFit: "cover",
        marginBottom: "1rem"
    },
    medicineInfo: {
        color: "#385B4A",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
    },
    medicineName: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        marginBottom: "0.5rem"
    },
    medicineDesc: {
        fontSize: "1rem",
        marginBottom: "0.5rem"
    },
    medicinePrice: {
        fontSize: "1.1rem",
        fontWeight: "bold",
        marginBottom: "0.5rem"
    },
    buyButton: {
        padding: "0.6rem 1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#385B4A",
        color: "#fff",
        cursor: "pointer",
        fontSize: "1rem",
    },
    noResults: {
        textAlign: "center",
        padding: "3rem",
        fontSize: "1.2rem",
        color: "#808080",
        fontFamily: 'inter bold 500',
        fontWeight: 'bold',
        width: "100%"
    }
};

export default MedicineCategory;

