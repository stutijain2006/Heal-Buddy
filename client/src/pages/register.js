import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        referralCode: "",
        agreeTerms: false,
        receiveTips: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.agreeTerms) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/register", {
                fullname: form.fullname,
                email: form.email,
                password: form.password,
                mobile: form.mobile
            });
            console.log("registration successful ", response.data);
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            const message= error?.response?.data?.message;
            
            if (message === "User already exists") {
                alert("User already exists");
            } else if (message==="Mobile number already exists" ) {
                alert("Mobile number already registered");
            } else if (error.response.status === 400) {
                alert("registration failed " + error.response.data.message);
            }else {
                alert("registration failed");
            }
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.leftPane}>
                <video
                    autoPlay
                    loop
                    muted
                    style={styles.video}
                    src="/assets/animation1.mp4"
                />
            </div>

            <div style={styles.rightPane}>
                <h2 style={styles.heading}>
                    Welcome To <br /><strong>Heal Buddy</strong>
                </h2>
                <p style= {styles.para}>Consult with best doctors in 15 mins</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required style={styles.input} />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />
                    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={styles.input} />
                    <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required style={styles.input} />
                    <input name="referralCode" placeholder="Referral Code (Optional)" value={form.referralCode} onChange={handleChange} style={{ ...styles.input, backgroundColor: "#C9DADA" , color: "#385B4A"}} />

                    <label style={styles.checkbox}>
                        <input type="checkbox" name="receiveTips" checked={form.receiveTips} onChange={handleChange} />
                        &nbsp; Send me personalized health tips & offers on <b>WhatsApp</b>
                    </label>

                    <label style={styles.checkbox}>
                        <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} required />
                        &nbsp; I agree to the <a href="#">T&C</a> and <a href="#">Privacy Policy</a> of Heal Buddy
                    </label>

                    <button type="submit" style={styles.button}>CONTINUE</button>

                    <div style={styles.loginLink}>
                        Already have an account? <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        backgroundColor: "#E8FBFB",
        color:"#385B4A"
    },
    leftPane: {
        width: "50%",
        backgroundColor: "#d2f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"
    },
    video: {
        width: "100%",
        height: "auto",
        borderRadius: "12px"
    },
    rightPane: {
        width: "50%",
        padding: "3rem 4rem",
        textAlign: "center"
    },
    heading: {
        fontSize: "1.75rem",
        marginBottom: "0.5rem"
    },
    para: {
        fontSize: "1rem",
        marginBottom: "1.5rem"
    },
    form: {
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    input: {
        width: "80%",
        padding: "0.75rem",
        marginBottom: "1rem",
        fontSize: "0.9rem",
        border: "1px solid #ccc",
        borderRadius: "8px"
    },
    checkbox: {
        fontSize: "0.9rem",
        marginBottom: "1rem",
        textAlign: "left",
        width: "80%"
    },
    button: {
        backgroundColor: "#fdbb3e",
        padding: "0.75rem 2rem",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "1rem",
        color: "#fff",
        cursor: "pointer",
        marginTop: "1rem"
    },
    loginLink: {
        marginTop: "2rem",
        fontSize: "1.05rem"
    }
};

export default Register;