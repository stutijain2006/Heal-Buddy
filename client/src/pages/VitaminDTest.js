import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VitaminDTest.css";

const VitaminDTest = () => {
    const [selectedSlot, setselectedSlot] = useState("");
    const [bookingStatus, setBookingStatus] = useState([]);
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

    const handleBooking = async () => {
        const token = localStorage.getItem("token");
        if (!selectedSlot) {
            setBookingStatus("Please select a time slot");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/lab-tests/book", {
                testName: "Vitamin D Test",
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
                <div className="vitaminDheading">Vitamin-D (25-Hydroxy)</div>
                <div className="header-right">
                    <button>➤</button>
                    <button>🛒</button>
                </div>
            </div>

            <div className="main-content">
                <div className="left-section">
                    <div className="test-name">Also known as: <span className="alias">Calcidiol</span></div>
                    <div> Also Known as Vitamin D - 25 Hydroxy (D2+D3), 25-Hydroxy Cholecalciferol, Vitamin D (25-OH), Vit D Total, Vit D 25-OH, Vit D (D2+D3), 25 OH D3, 25 Hydroxy D3, 25 Hydroxy, Vit D, VitD, Vitamin D, Bone Check, Calcidiol, Vit D (25-OH), Calcidiol, 25-hydroxycholecalciferol</div>
                    <div>📊 23000+ booked recently</div>
                    <div>👥 For Men & Women</div>
                    <div className="price"> ₹500 <span className="strike">₹1500</span> <span className="discount">65% off</span></div>

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
                        <div> 📝 Reports available within < span className="slot-select">6 hours</span></div>
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
                    <div className="subsection">A vitamin D test measures the levels of vitamin D in your blood. Vitamin D helps your body absorb calcium to build healthy bones and teeth. It also helps keep your muscles, nerves, and immune system working normally. Having vitamin D deficiency (very low levels of vitamin D) can lead to and other medical conditions. Two forms of vitamin D can be measured in the blood, 25-hydroxyvitamin D and 1,25-dihydroxyvitamin D. </div>
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
                                <div> Vitamin-D Test</div>
                            </div>
                            <div className="subsectionicon">➡️</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-section">
                <div className="head1">🌞 Who should get Tested</div>
                <div className= "bottomsec">
                    <div className="bottomsubsec">
                        <div className="bottomsubsechead">Young Women</div>
                        <div>Deficiency can cause Hormonal Imbalance </div>
                        <img className="bottomimage" src="/assets/young-women.png" alt="Women" />
                    </div>
                    <div className="bottomsubsec">
                        <div className="bottomsubsechead">Pregnant Women</div>
                        <div>Deficiency raises the risk of preeclampsia & gestational diabetes</div>
                        <img className="bottomimage" src="/assets/pregnant-women.png" alt= "Pregnant Women" />
                    </div>
                    <div className="bottomsubsec">
                        <div className="bottomsubsechead">Women over 50 years</div>
                        <div>Postmenopause vitamin D drops, raising osteoporosis risk</div>
                        <img className="bottomimage" src="/assets/old-women.png" alt="Women" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VitaminDTest;