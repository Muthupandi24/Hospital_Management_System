import { useState, useEffect } from "react";
import axios from "axios";

function Patients() {

    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [disease, setDisease] = useState("");

    const fetchPatients = () => {
        axios.get("http://127.0.0.1:5000/patients")
            .then(res => setPatients(res.data))
            .catch(() => alert("Error fetching patients"));
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const addPatient = async () => {

        if (!name || !age || !gender || !disease) {
            alert("Fill all fields");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:5000/add-patient", {
                name,
                age,
                gender,
                disease
            });

            alert("Patient Added");

            setName("");
            setAge("");
            setGender("");
            setDisease("");

            fetchPatients();

        } catch {
            alert("Error adding patient");
        }
    };

    return (
        <div style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>

            <div style={{ maxWidth: "800px", margin: "auto" }}>

                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Patients
                </h2>

                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    marginBottom: "25px"
                }}>

                    <h4 style={{ marginBottom: "15px" }}>Add Patient</h4>

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
                        placeholder="Disease"
                        value={disease}
                        onChange={(e) => setDisease(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
                    />

                    <button
                        onClick={addPatient}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Add Patient
                    </button>

                </div>

                {patients.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            background: "white",
                            padding: "15px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                            marginBottom: "10px"
                        }}
                    >
                        <strong>{p.name}</strong>
                        <p style={{ margin: "5px 0", color: "gray" }}>
                            {p.disease}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Patients;