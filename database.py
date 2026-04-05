import mysql.connector

def connect_db():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",          
            password="root", 
            database="hospital"
        )
        print("Database connected successfully")
        return conn

    except Exception as e:
        print("Database connection failed:", e)
        return None