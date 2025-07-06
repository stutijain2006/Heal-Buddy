import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login",{
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            alert("Login successful");

            if (response.data.user.isAdmin){
                navigate("/admin/dashboard");
            }else{
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed");
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
                    Welcome Back to <br /><strong>Heal Buddy</strong>
                </h2>
                <p style={styles.para}>Login to consult with top doctors instantly</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>LOGIN</button>

                    <div style={styles.signupLink}>
                        Don't have an account? <a href="/register">Sign up</a>
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
        color: "#385B4A"
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
    signupLink:{
        marginTop: "2rem",
        fontSize: "1.05rem"
    }
};

export default Login;