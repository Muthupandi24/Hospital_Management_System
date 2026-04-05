import { useState, useEffect } from "react";
import axios from "axios";

function AssignDoctor() {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
    }, []);

    const fetchPatients = () => {
        axios.get("http://127.0.0.1:5000/patients")
            .then(res => setPatients(res.data))
            .catch(() => alert("Error fetching patients"));
    };

    const fetchDoctors = () => {
        axios.get("http://127.0.0.1:5000/doctors")
            .then(res => setDoctors(res.data))
            .catch(() => alert("Error fetching doctors"));
    };

    const assignDoctor = async () => {

        if (!selectedPatient || !selectedDoctor) {
            alert("Select both patient and doctor");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:5000/assign-doctor", {
                patient_id: selectedPatient,
                doctor_id: selectedDoctor
            });

            alert("Doctor Assigned Successfully");

            setSelectedPatient("");
            setSelectedDoctor("");

        } catch {
            alert("Error assigning doctor");
        }
    };

    return (
        <div style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>

            <div style={{ maxWidth: "500px", margin: "auto" }}>

                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Assign Doctor
                </h2>

                <div style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                }}>

                    <label style={{ marginBottom: "5px", display: "block" }}>
                        Select Patient
                    </label>

                    <select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            borderRadius: "8px"
                        }}
                    >
                        <option value="">Select Patient</option>
                        {patients.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <label style={{ marginBottom: "5px", display: "block" }}>
                        Select Doctor
                    </label>

                    <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "20px",
                            borderRadius: "8px"
                        }}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={assignDoctor}
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
                        Assign Doctor
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AssignDoctor;