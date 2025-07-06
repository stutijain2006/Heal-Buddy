import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from './Profile';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const showProfile = location.pathname === '/profile';

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to continue");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div style={styles.wrapper}>
            <div style={styles.navbar}>
                <div style={styles.logo}>💚 Heal Buddy</div>
                <div style={styles.navLinks}>
                    <Link to="/" style={styles.link}>Home</Link>
                    <Link to="/book-appointment" style={styles.link}>Doctors</Link>
                    <Link to="/book-lab" style={styles.link}>Lab Tests</Link>
                    <Link to="/order-medicine" style={styles.link}>Order Medicine</Link>
                    <Link to="/profile" style={styles.link}><img src="/assets/profileimage.png" alt="Profile" style={styles.profileImage} /></Link>
                </div>
            </div>

            <div style={styles.heroSection}>
                <div>
                    <div style={styles.tagline}>
                        ✨ Rated #1 choice for healthcare appointments by users
                    </div>
                    <div>
                        <h1 style={styles.heading}>Bridging the Gap to Better Health</h1>
                        <p style={styles.subtext}>
                            We simplify your journey to better health,
                            seamlessly connecting you with the care and support you deserve.                        </p>
                        <button style={styles.ccaBtn}>Book Consultation</button>
                        <button style={styles.ctaBtn}>Learn More →</button>
                    </div>

                </div>
                <img
                    src="/assets/home-page1.png"
                    alt="Doctor Consultation"
                    style={styles.heroImage}
                />
            </div>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <div style={styles.sectionHeading}>Choose Doctor’s <span style={{ color: '#4B49AC' }}>Expertise</span></div>
                    <div>
                        <Link to="/book-appointment">See All</Link>
                    </div>
                </div>
                <div style={styles.cardContainer}>
                    <div style={styles.card}>
                        <img src='/assets/heart1.png' alt="Heart Icon" style={styles.icon} />
                        <div style={styles.cardHeading} >Cardiologist</div>
                        <p style={styles.cardPara}>Heart specialist focusing on cardiovascular health and diseases.</p>
                        <div style={styles.secondaryBtn}>Book Consultation →</div>
                    </div>

                    <div style={styles.card}>
                        <img src='/assets/brain.png' alt="Neurologist Icon" style={styles.icon} />
                        <div style={styles.cardHeading} >Neurologist</div>
                        <p style={styles.cardPara}>Doctor specializing in diagnosing and treating nervous system disorders.</p>
                        <div style={styles.secondaryBtn}>Book Consultation →</div>
                    </div>

                    <div style={styles.card}>
                        <img src='/assets/ENT .png' alt="ENT Icon" style={styles.icon} />
                        <div style={styles.cardHeading} >ENT Specialist</div>
                        <p style={styles.cardPara}>Doctor specializing in ear, nose, and throat disorders and surgeries.</p>
                        <div style={styles.secondaryBtn}>Book Consultation →</div>
                    </div>
                </div>
            </div>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <div style={styles.sectionHeading}>Your Testing Destination</div>
                    <div>
                        <Link to="/book-lab">See All</Link>
                    </div>
                </div>
                <div style={styles.cardContainer}>
                    <div style={styles.card}>
                        <img src='/assets/full-body.png' alt="Full Body Icon" style={styles.icon} />
                        <div style={styles.cardHeading} >Full Body Checkup</div>
                        <p style={styles.cardPara}>Complete health checkup for overall wellness and early detection.</p>
                        <div style={styles.secondaryBtn}>Book Test →</div>
                    </div>

                    <div style={styles.card}>
                        <img src='/assets/vitamin-D.png' alt="D Icon" style={styles.icon} />
                        <div style={styles.cardHeading} >Vitamin-D Test</div>
                        <p style={styles.cardPara}>Essential test to assess and maintain healthy Vitamin-D levels.</p>
                        <div style={styles.secondaryBtn}>Book Test →</div>
                    </div>

                    <div style={styles.card}>
                        <img src='/assets/heart1.png' alt="Heart Icon" style={styles.icon} />
                        <div style={styles.cardHeading} >Heart Checkup</div>
                        <p style={styles.cardPara}>Comprehensive testing to monitor and safeguard your heart health.</p>
                        <div style={styles.secondaryBtn}>Book Test →</div>
                    </div>
                </div>
            </div>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <div style={styles.sectionHeading}>Explore our App's Feature</div>
                </div>
                <div style={styles.featureContainer}>
                    <div style={styles.featurediv1}>
                        <div style={styles.sub1}>
                            <div style={styles.sub1content}>
                                <div style={styles.featureHeading}>Convenient Online Booking </div>
                                <div style={styles.featurePara}>Easily schedule consultations and meetings with healthcare professionals through our user-friendly online booking platform.</div>
                            </div>
                            <img src='/assets/online-booking.png' alt="Feature" style={styles.featureImage21} />
                        </div>
                        <div style={styles.sub2}>
                            <div style={styles.sub3}>
                                <img src='/assets/Easy.png' alt="Feature" style={styles.featureImage1} />
                                <div style={styles.featureHeading}>Easy To Handle</div>
                                <div style={styles.featurePara}>Navigate with ease through a clean and intuitive interface. Designed for everyone — no tech skills needed!</div>
                            </div>
                            <div style={styles.sub3}>
                                <img src='/assets/medicine.png' alt="Feature" style={styles.featureImage1} />
                                <div style={styles.featureHeading}>User-Medicine Interaction </div>
                                <div style={styles.featurePara}>Consolidates prescriptions for clarity and alerts users about dosage schedules and potential medication risks.</div>
                            </div>
                        </div>
                    </div>
                    <div style={styles.featurediv2}>
                        <img src='/assets/full-body.png' alt="Feature" style={styles.featureImage1} />
                        <div style={styles.featureHeading}>Easy Lab Testing </div>
                        <div style={styles.featurePara}>Get accurate lab reports quickly and easily, whether from various lab centers or the comfort of your home, all delivered by experienced professionals..</div>
                        <img src='/assets/lab-testing.png' alt="Feature" style={styles.featureImage2} />
                    </div>
                </div>
            </div>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <div style={styles.sectionHeading}>Testimonials from our <span style={{ color: '#4B49AC' }}>Satisfied</span> Patients</div>
                </div>
                <div style={styles.testimonial}>
                    <div style={styles.testimonialdiv1}>
                        <div>
                            <img
                                src="/assets/testimonial.png"
                                alt="Patient"
                                style={styles.testimonialImag} />
                        </div>
                        <div style={styles.testimonialText}>
                            <div style={styles.testimonialText1}> “I have been using this app for several months, and it has proven to be highly reliable and trustworthy for doctor consultations and lab bookings. It provides accurate reports, syncs with my smartwatch to track all my routines, and sends timely alerts for my medication dosage.”</div>
                            <div style={styles.testimonialText2}> - Amelia Rose</div>
                            <div> Software Engineer</div>
                        </div>
                    </div>
                    <div style={styles.testimonialdiv2}>
                        <img
                            src="/assets/Left-Arrow.png"
                            alt="Arrows"
                            style={styles.testimonialArrow} />
                        <img src="/assets/Dots.png" alt="Dots" style={styles.testimonialArrow} />
                        <img src="/assets/Right-Arrow.png" alt="Arrows" style={styles.testimonialArrow} />
                    </div>
                </div>
            </div>

            <div>
                <img
                    src="/assets/image1.png"
                    alt="Doctor"
                    style={styles.doctorImage}
                />
            </div>

            <div style={styles.footer}>
                <div style={styles.footerdiv}>
                    <div style={styles.footerHeading}>
                        <div><img
                            src="/assets/heal-buddy-logo.png"
                            alt="Logo"
                            style={styles.footerLogo}
                        /></div>
                        <div style={styles.footerLogoText}>Heal Buddy</div>
                    </div>
                    <div style={styles.footerPara}>An all-in-one healthcare app that connects you with doctors, streamlines lab test bookings, provides easy access to reports, and helps you manage medications and health routines.</div>
                </div>
                <div style={styles.footericons}>
                    <a href="https://www.linkedin.com/in/stutijain2006/" style={styles.iconLink}>
                        <img src="/assets/linkedin.png" alt="Icon 1" style={styles.iconImage} />
                    </a>
                    <a href="https://www.instagram.com/stutijain2006" style={styles.iconLink}>
                        <img src="/assets/instagram.png" alt="Icon 2" style={styles.iconImage} />
                    </a>
                    <a href="stuti_j@cy.iitr.ac.in" style={styles.iconLink}>
                        <img src="/assets/mail.png" alt="Icon 3" style={styles.iconImage} />
                    </a>
                </div>
            </div>
            {showProfile && (
                <div style={styles.overlay}>
                    <Profile />
                </div>
            )}
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'sans-serif',
        backgroundColor: '#E8FBFB',
        color: '#385B4A',
        minHeight: '100vh'
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#E8FBFB',
        fontSize: '1.35rem',
        fontWeight: 'bold',
        marginTop: '1rem'
    },
    profileImage: {
        width: '4.5rem',
        height: 'auto',
        borderRadius: '20%'
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        alignItems: 'center',
        gap: '1.5rem'
    },
    link: {
        textDecoration: 'none',
        color: '#385B4A',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    heroSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 7rem',
        textAlign: 'left'
    },
    heading: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        fontFamily: 'inria',
        fontStyle: 'italic'
    },
    subtext: {
        fontSize: '1.7rem',
        margin: '1rem 0',
        fontFamily: 'inria'
    },
    tagline: {
        fontSize: '1.35rem',
        margin: '1rem 0',
        fontFamily: 'inter',
        color: '#3B22CE',
        fontWeight: 'bold',
        border: '1px solid #3B22CE',
        borderRadius: '15px',
        padding: '0.25rem'
    },
    ccaBtn: {
        backgroundColor: '#3B22CE',
        border: '1px solid #3B22CE',
        padding: '0.5rem 0.75rem',
        borderRadius: '15px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontFamily: 'inria',
        margin: '1rem'
    },
    ctaBtn: {
        backgroundColor: '#E8FBFB',
        border: '1px solid #3B22CE',
        padding: '0.5rem 0.75rem',
        borderRadius: '15px',
        color: '#3B22CE',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontFamily: 'inria'
    },
    heroImage: {
        width: '45%',
        borderRadius: '12px'
    },
    section: {
        padding: '2rem 3rem',
        margin: '2rem'
    },
    sectionTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontSize: '1.2rem',
        marginBottom: '1rem',
        padding: '0 1rem',
        color: '#385B4A'
    },
    sectionHeading: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#385B4A'
    },
    cardContainer: {
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '1rem'
    },
    card: {
        border: '0.52px solid #3B22CE',
        padding: '1.5rem',
        borderRadius: '12px',
        width: '25vw',
        boxShadow: '10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        color: '#808080'
    },
    icon: {
        width: '3.5rem',
        height: 'auto'
    },
    cardHeading: {
        fontSize: '1.7rem',
        fontWeight: 'bold',
        color: '#385B4A'
    },
    secondaryBtn: {
        color: '#3B22CE',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    cardPara: {
        fontSize: '1.1rem'
    },
    featureContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem'
    },
    featurediv1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    featurediv2: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        textAlign: 'left',
        padding: '2rem 2rem 1rem 1rem',
        borderRadius: '16px',
        border: '0.52px solid #385B4A',
    },
    featureImage2: {
        width: '18vw',
        height: 'auto',
        paddingTop: '1rem'
    },
    sub1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'left',
        borderRadius: '16px',
        border: '0.52px solid #385B4A',
        padding: '1rem',
        marginRight: '1rem'
    },
    sub2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    featureImage21: {
        width: '40%',
        height: 'auto'
    },
    featureImage1: {
        width: '3vw',
        height: 'auto',
        paddingBottom: '1rem'
    },
    sub3: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        padding: '2rem 2rem 1rem 1rem',
        marginRight: '1rem',
        marginTop: '2rem',
        borderRadius: '16px',
        border: '0.52px solid #385B4A',
    },
    testimonialText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        color: '#808080',
        padding: '2rem 1.5rem',
        borderRadius: '8px',
        border: '0.52px solid #385B4A',
        fontSize: '1.2rem',
        letterSpacing: '0.5px'
    },
    testimonialText1: {
        fontSize: '1.7rem',
        color: '#000000',
        fontFamily: 'instrument Sans Medium 500',
        paddingBottom: '3rem'
    },
    testimonialText2: {
        fontSize: '1.4rem',
        color: '#3B22CE',
        fontFamily: 'instrument Sans Medium 500',
        paddingBottom: '0.8rem'
    },
    testimonialdiv1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'left'
    },
    testimonialdiv2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem'
    },
    testimonialImag: {
        width: '20vw',
        height: 'auto',
        borderRadius: '8px',
        marginRight: '4rem'
    },
    testimonialArrow: {
        width: '3.5vw',
        height: 'auto'
    },
    featureHeading: {
        fontSize: '1.7rem',
        fontFamily: 'inter medium 500',
        color: '#385B4A',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        paddingBottom: '1rem'
    },
    featurePara: {
        fontSize: '1.1rem',
        color: '#808080',
        letterSpacing: '0.5px'
    },
    doctorImage: {
        width: '90%',
        height: 'auto',
        margin: '0'
    },
    footer: {
        textAlign: 'center',
        paddingTop: '1rem',
        color: '#578F88',
        backgroundColor: '#578F88CF',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    footerdiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '1rem 2rem 1rem 0'
    },
    footerPara: {
        fontSize: '1rem',
        color: '#ffffff',
        letterSpacing: '0.5px',
        paddingBottom: '1.3rem',
        fontFamily: 'inria sans bold 500',
        letterSpacing: '0.5px'
    },
    footerHeading: {
        fontSize: '2rem',
        color: '#385B4A',
        letterSpacing: '0.5px',
        paddingBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'inter medium 500',
        fontWeight: 'bold'
    },
    footerLogo: {
        width: '4.5vw',
        height: 'auto',
        marginRight: '1rem'
    },
    footericons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconImage: {
        width: '4vw',
        height: 'auto',
        marginRight: '0.5rem',
    }

};

export default Home;

