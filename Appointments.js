import { useState, useEffect } from "react";
import axios from "axios";

function Appointments() {

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [selectedPatient, setSelectedPatient] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [date, setDate] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchAppointments();
    }, []);

    const fetchPatients = () => {
        axios.get("http://127.0.0.1:5000/patients")
            .then(res => setPatients(res.data))
            .catch(() => setMessage("Error fetching patients"));
    };

    const fetchDoctors = () => {
        axios.get("http://127.0.0.1:5000/doctors")
            .then(res => setDoctors(res.data))
            .catch(() => setMessage("Error fetching doctors"));
    };

    const fetchAppointments = () => {
        axios.get("http://127.0.0.1:5000/appointments")
            .then(res => setAppointments(res.data))
            .catch(() => setMessage("Error fetching appointments"));
    };

    const getPatientName = (id) => {
        const p = patients.find(x => x.id === id);
        return p ? p.name : id;
    };

    const getDoctorName = (id) => {
        const d = doctors.find(x => x.id === id);
        return d ? d.name : id;
    };

    const bookAppointment = async () => {

        if (!selectedPatient || !selectedDoctor || !date) {
            setMessage("Fill all fields");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:5000/book-appointment", {
                patient_id: selectedPatient,
                doctor_id: selectedDoctor,
                appointment_date: date
            });

            setMessage("Appointment booked successfully");

            setSelectedPatient("");
            setSelectedDoctor("");
            setDate("");

            fetchAppointments();

        } catch {
            setMessage("Something went wrong");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.post("http://127.0.0.1:5000/update-appointment-status", {
                appointment_id: id,
                status: status
            });

            setMessage(`Status updated to ${status}`);
            fetchAppointments();

        } catch {
            setMessage("Update failed");
        }
    };

    return (
        <div style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>

            <div style={{ maxWidth: "900px", margin: "auto" }}>

                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Appointments
                </h2>

                {message && (
                    <div style={{
                        background: "#d4edda",
                        padding: "10px",
                        borderRadius: "8px",
                        marginBottom: "15px",
                        textAlign: "center"
                    }}>
                        {message}
                    </div>
                )}

                <div style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    marginBottom: "25px"
                }}>
                    <select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
                    >
                        <option value="">Select Patient</option>
                        {patients.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
                    />

                    <button
                        onClick={bookAppointment}
                        disabled={!selectedPatient || !selectedDoctor || !date}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            fontWeight: "bold",
                            opacity: (!selectedPatient || !selectedDoctor || !date) ? 0.6 : 1,
                            cursor: "pointer"
                        }}
                    >
                        Book Appointment
                    </button>
                </div>

                {appointments.map((a) => (
                    <div
                        key={a.id}
                        style={{
                            background: "white",
                            padding: "15px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                            marginBottom: "10px"
                        }}
                    >
                        <p>
                            <strong>{getPatientName(a.patient_id)}</strong> with{" "}
                            <strong>{getDoctorName(a.doctor_id)}</strong>
                        </p>

                        <p style={{ color: "gray" }}>
                            {a.appointment_date}
                        </p>

                        <p>
                            Status:{" "}
                            <span style={{
                                padding: "5px 10px",
                                borderRadius: "6px",
                                background:
                                    a.status === "pending" ? "#ffc107" :
                                    a.status === "approved" ? "#28a745" :
                                    a.status === "rejected" ? "#dc3545" :
                                    "#6c757d",
                                color: "white"
                            }}>
                                {a.status}
                            </span>
                        </p>

                        {a.status === "pending" && (
                            <>
                                <button onClick={() => updateStatus(a.id, "approved")} style={{ marginRight: "10px" }}>
                                    Approve
                                </button>
                                <button onClick={() => updateStatus(a.id, "rejected")}>
                                    Reject
                                </button>
                            </>
                        )}

                        {a.status === "approved" && (
                            <button onClick={() => updateStatus(a.id, "completed")}>
                                Complete
                            </button>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Appointments;