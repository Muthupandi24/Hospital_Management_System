from flask import Flask, request, jsonify
from database import connect_db
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import bcrypt
import os

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "supersecretkey"
jwt = JWTManager(app)


@app.route("/add-patient", methods=["POST"])
def add_patient():
    data = request.json

    if not data.get("name"):
        return jsonify({"error": "Name required"}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO patients (name, age, gender, disease) VALUES (%s,%s,%s,%s)",
            (data["name"], data["age"], data["gender"], data["disease"])
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Patient added"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/patients", methods=["GET"])
def get_patients():
    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM patients")
        rows = cursor.fetchall()

        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "name": row[1],
                "age": row[2],
                "gender": row[3],
                "disease": row[4]
            })

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/add-doctor", methods=["POST"])
def add_doctor():
    data = request.json

    if not data.get("name"):
        return jsonify({"error": "Name required"}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO doctors (name, age, gender, specialization) VALUES (%s,%s,%s,%s)",
            (data["name"], data["age"], data["gender"], data["specialization"])
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Doctor added"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/doctors", methods=["GET"])
def get_doctors():
    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM doctors")
        rows = cursor.fetchall()

        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "name": row[1],
                "age": row[2],
                "gender": row[3],
                "specialization": row[4]
            })

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/assign-doctor", methods=["POST"])
def assign_doctor():
    data = request.json

    if not data.get("patient_id") or not data.get("doctor_id"):
        return jsonify({"error": "Missing data"}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM patients WHERE patient_id=%s", (data["patient_id"],))
        if not cursor.fetchone():
            return jsonify({"error": "Patient not found"}), 404

        cursor.execute("SELECT * FROM doctors WHERE doctor_id=%s", (data["doctor_id"],))
        if not cursor.fetchone():
            return jsonify({"error": "Doctor not found"}), 404

        cursor.execute(
            "UPDATE patients SET assigned_doctor_id=%s WHERE patient_id=%s",
            (data["doctor_id"], data["patient_id"])
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Doctor assigned"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/book-appointment", methods=["POST"])
def book_appointment():
    data = request.json

    if not data.get("patient_id") or not data.get("doctor_id") or not data.get("appointment_date"):
        return jsonify({"error": "Missing data"}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (%s,%s,%s,'pending')",
            (data["patient_id"], data["doctor_id"], data["appointment_date"])
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Appointment booked"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/appointments", methods=["GET"])
def get_appointments():
    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM appointments")
        rows = cursor.fetchall()

        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "patient_id": row[1],
                "doctor_id": row[2],
                "appointment_date": row[3],
                "status": row[4]
            })

        conn.close()
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/update-appointment-status", methods=["POST"])
def update_status():
    data = request.json

    if not data.get("appointment_id") or not data.get("status"):
        return jsonify({"error": "Missing data"}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute(
            "UPDATE appointments SET status=%s WHERE id=%s",
            (data["status"], data["appointment_id"])
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Updated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("email") or not data.get("password") or not data.get("role"):
        return jsonify({"error": "Missing data"}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
        if cursor.fetchone():
            return jsonify({"error": "User exists"}), 400

        hashed = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())

        cursor.execute(
            "INSERT INTO users (name, email, password, role) VALUES (%s,%s,%s,%s)",
            (data["name"], data["email"], hashed, data["role"])
        )

        conn.commit()
        conn.close()

        return jsonify({"message": "Registered"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
        user = cursor.fetchone()

        conn.close()

        if user:
            stored_password = user[3]

            if not isinstance(stored_password, bytes):
                stored_password = stored_password.encode("utf-8")

            if bcrypt.checkpw(data["password"].encode("utf-8"), stored_password):
                token = create_access_token(identity=user[0])

                return jsonify({
                    "message": "Login success",
                    "token": token,
                    "role": user[4]
                }), 200

        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=10000)