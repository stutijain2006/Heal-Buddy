import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./VitaminDTest.css";

const LabTestPage = () => {
    const { testName } = useParams();
    const [selectedSlot, setselectedSlot] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const navigate = useNavigate();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    // Format for display (DD/MM/YYYY)
    const formattedDate = nextDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    // Format for API (ISO string)
    const apiDate = nextDate.toISOString();

    // Test details mapping
    const testDetails = {
        "vitamin-d": {
            displayName: "Vitamin-D (25-Hydroxy)",
            alias: "Calcidiol",
            description: "Also Known as Vitamin D - 25 Hydroxy (D2+D3), 25-Hydroxy Cholecalciferol, Vitamin D (25-OH), Vit D Total, Vit D 25-OH, Vit D (D2+D3), 25 OH D3, 25 Hydroxy D3, 25 Hydroxy, Vit D, VitD, Vitamin D, Bone Check, Calcidiol, Vit D (25-OH), Calcidiol, 25-hydroxycholecalciferol",
            price: 500,
            originalPrice: 1500,
            discount: 65,
            reportTime: "6 hours"
        },
        "full-body-checkup": {
            displayName: "Full Body Checkup",
            alias: "Complete Health Package",
            description: "Comprehensive health checkup including complete blood count, liver function, kidney function, lipid profile, and more.",
            price: 2000,
            originalPrice: 5000,
            discount: 60,
            reportTime: "24 hours"
        },
        "diabetes": {
            displayName: "Diabetes Test",
            alias: "HbA1c, Blood Glucose",
            description: "Tests for diabetes including fasting blood sugar, postprandial glucose, and HbA1c levels.",
            price: 600,
            originalPrice: 1200,
            discount: 50,
            reportTime: "12 hours"
        },
        "thyroid": {
            displayName: "Thyroid Function Test",
            alias: "T3, T4, TSH",
            description: "Complete thyroid panel including T3, T4, and TSH levels to assess thyroid function.",
            price: 700,
            originalPrice: 1500,
            discount: 53,
            reportTime: "12 hours"
        },
        "fever": {
            displayName: "Fever Panel",
            alias: "Complete Fever Test",
            description: "Comprehensive test for fever including CBC, Malaria, Dengue, and other common fever-causing infections.",
            price: 800,
            originalPrice: 1800,
            discount: 55,
            reportTime: "6 hours"
        },
        "blood-studies": {
            displayName: "Complete Blood Count (CBC)",
            alias: "Hemogram",
            description: "Complete blood count test including hemoglobin, WBC, RBC, platelets, and other blood parameters.",
            price: 400,
            originalPrice: 800,
            discount: 50,
            reportTime: "6 hours"
        },
        "liver": {
            displayName: "Liver Function Test",
            alias: "LFT",
            description: "Comprehensive liver function test including ALT, AST, bilirubin, and other liver enzymes.",
            price: 600,
            originalPrice: 1200,
            discount: 50,
            reportTime: "12 hours"
        },
        "hairfall": {
            displayName: "Hair Fall Test",
            alias: "Hair Health Panel",
            description: "Tests for hair fall causes including vitamin D, B12, ferritin, and thyroid function.",
            price: 1500,
            originalPrice: 3000,
            discount: 50,
            reportTime: "24 hours"
        }
    };

    const testInfo = testDetails[testName?.toLowerCase()] || {
        displayName: testName || "Lab Test",
        alias: "",
        description: "Comprehensive laboratory test for health screening.",
        price: 500,
        originalPrice: 1500,
        discount: 65,
        reportTime: "6 hours"
    };

    const handleBooking = async () => {
        const token = localStorage.getItem("token");
        if (!selectedSlot) {
            setBookingStatus("Please select a time slot");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/lab-tests/book", {
                testName: testInfo.displayName,
                testDate: apiDate,
                timeSlot: selectedSlot,
                mode: "lab"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBookingStatus("Test added successfully, Awaiting admin approval");
        } catch (error) {
            console.error("Error booking test:", error);
            setBookingStatus("Error booking test. Please try again later.");
        }
    };

    return (
        <div className="vitamin-d-container">
            <div className="header">
                <button onClick={() => navigate("/book-lab")} className="backArrow">⬅️</button>
                <div className="vitaminDheading">{testInfo.displayName}</div>
                <div className="header-right">
                    <button>➤</button>
                    <button>🛒</button>
                </div>
            </div>

            <div className="main-content">
                <div className="left-section">
                    {testInfo.alias && <div className="test-name">Also known as: <span className="alias">{testInfo.alias}</span></div>}
                    <div>{testInfo.description}</div>
                    <div>📊 23000+ booked recently</div>
                    <div>👥 For Men & Women</div>
                    <div className="price"> ₹{testInfo.price} <span className="strike">₹{testInfo.originalPrice}</span> <span className="discount">{testInfo.discount}% off</span></div>

                    <div className="slot-section">
                        <div> 📅 Next Slot: <span className="slot-select">{formattedDate}</span></div>
                        <select className="slot-selection" value={selectedSlot} onChange={(e) => setselectedSlot(e.target.value)}>
                            <option value="">Select Time Slot</option>
                            <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                            <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                            <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                        </select>
                        <div> 📝 Reports available within <span className="slot-select">{testInfo.reportTime}</span></div>
                        <div className="offers">
                            <div className="offers-content">
                                <div className="main-offer">Get additional 10% off on your first test</div>
                                <div> Use 1MGNEWG at checkout </div>
                            </div>
                            <div className="copy-icon">📑</div>
                        </div>
                    </div>

                    <button onClick={handleBooking} className="book-btn">Book Now</button>
                    {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
                </div>

                <div className="right-section">
                    <div className="head1">Know more about this test</div>
                    <div className="subsection">{testInfo.description}</div>
                    <div className="subsec">
                        <div className="subsection">
                            <div className="subsectionicon">🧪</div>
                            <div className="subsectiontext">
                                <div className="subsectioncontent">Find Out</div>
                                <div> Why is this test booked</div>
                            </div>
                            <div className="subsectionicon">➡️</div>
                        </div>
                        <div className="subsection">
                            <div className="subsectionicon">🩸</div>
                            <div className="subsectiontext">
                                <div className="subsectioncontent">Samples Required</div>
                                <div> Blood</div>
                            </div>
                            <div className="subsectionicon">➡️</div>
                        </div>
                        <div className="subsection">
                            <div className="subsectionicon">📝</div>
                            <div className="subsectiontext">
                                <div className="subsectioncontent">Preparations</div>
                                <div> No special Preparations required</div>
                            </div>
                            <div className="subsectionicon">➡️</div>
                        </div>
                        <div className="subsection">
                            <div className="subsectionicon">👩‍⚕️</div>
                            <div className="subsectiontext">
                                <div className="subsectioncontent">Tests Included</div>
                                <div> {testInfo.displayName}</div>
                            </div>
                            <div className="subsectionicon">➡️</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabTestPage;

