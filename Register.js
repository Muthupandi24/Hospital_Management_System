import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {

        if (!name || !email || !password || !role) {
            alert("Fill all fields");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:5000/register", {
                name,
                email,
                password,
                role
            });

            alert("Account created successfully");
            navigate("/");

        } catch {
            alert("Registration failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea, #764ba2)"
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
                    Create Account
                </h2>

                <p style={{ textAlign: "center", color: "gray", marginBottom: "25px" }}>
                    Register to continue
                </p>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "12px",
                        borderRadius: "10px",
                        border: "1px solid #ccc"
                    }}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "12px",
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
                        marginBottom: "12px",
                        borderRadius: "10px",
                        border: "1px solid #ccc"
                    }}
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        border: "1px solid #ccc"
                    }}
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                </select>

                <button
                    onClick={handleRegister}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#667eea",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Register
                </button>

                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "#667eea", cursor: "pointer", fontWeight: "500" }}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Register;