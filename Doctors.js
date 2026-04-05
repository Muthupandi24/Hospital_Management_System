import { useState, useEffect } from "react";
import axios from "axios";

function Doctors() {

    const [doctors, setDoctors] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");

    const fetchDoctors = () => {
        axios.get("http://127.0.0.1:5000/doctors")
            .then(res => setDoctors(res.data))
            .catch(() => alert("Error fetching doctors"));
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const addDoctor = async () => {

        if (!name || !age || !gender || !specialization) {
            alert("Fill all fields");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:5000/add-doctor", {
                name,
                age,
                gender,
                specialization
            });

            alert("Doctor Added");

            setName("");
            setAge("");
            setGender("");
            setSpecialization("");

            fetchDoctors();

        } catch {
            alert("Error adding doctor");
        }
    };

    return (
        <div style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>

            <div style={{ maxWidth: "800px", margin: "auto" }}>

                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Doctors
                </h2>

                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    marginBottom: "25px"
                }}>

                    <h4 style={{ marginBottom: "15px" }}>Add Doctor</h4>

                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
                    />

                    <input
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
                    />

                    <input
                        placeholder="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
                    />

                    <input
                        placeholder="Specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
                    />

                    <button
                        onClick={addDoctor}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Add Doctor
                    </button>

                </div>

                {doctors.map((d) => (
                    <div
                        key={d.id}
                        style={{
                            background: "white",
                            padding: "15px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                            marginBottom: "10px"
                        }}
                    >
                        <strong>{d.name}</strong>
                        <p style={{ margin: "5px 0", color: "gray" }}>
                            {d.specialization}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Doctors;