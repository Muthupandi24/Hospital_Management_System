import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    return (
        <div style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>

            <div style={{ maxWidth: "900px", margin: "auto" }}>

                <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                    Dashboard
                </h2>

                <p style={{ textAlign: "center", color: "gray", marginBottom: "30px" }}>
                    Hospital Management System
                </p>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px"
                }}>

                    <div 
                        onClick={() => navigate("/patients")}
                        style={cardStyle("#007bff")}
                    >
                        Patients
                    </div>

                    <div 
                        onClick={() => navigate("/doctors")}
                        style={cardStyle("#28a745")}
                    >
                        Doctors
                    </div>

                    <div 
                        onClick={() => navigate("/assign")}
                        style={cardStyle("#ffc107")}
                    >
                        Assign Doctor
                    </div>

                    <div 
                        onClick={() => navigate("/appointments")}
                        style={cardStyle("#17a2b8")}
                    >
                        Appointments
                    </div>

                </div>

                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <button 
                        onClick={() => navigate("/")}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#dc3545",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                </div>

            </div>

        </div>
    );
}

const cardStyle = (color) => ({
    background: color,
    color: "white",
    padding: "40px 20px",
    borderRadius: "15px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "0.3s"
});

export default Dashboard;