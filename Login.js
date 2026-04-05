import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/login", {
                email,
                password
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }

        } catch {
            alert("Login error");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #4facfe, #00f2fe)"
            }}
        >

            <div
                style={{
                    width: "380px",
                    padding: "30px",
                    borderRadius: "20px",
                    background: "white",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >

                <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                    Hospital Management
                </h2>

                <p style={{ textAlign: "center", color: "gray", marginBottom: "25px" }}>
                    Login to your account
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        border: "1px solid #ccc"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#4facfe",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Don't have an account?{" "}
                    <span
                        style={{ color: "#4facfe", cursor: "pointer", fontWeight: "500" }}
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;