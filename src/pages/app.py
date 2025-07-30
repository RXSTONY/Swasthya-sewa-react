from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["swasthya"]
collection = db["users"]

@app.route("/")
def home():
    return "<h2>Doctor Search API is Running</h2>"

@app.route("/search")
def search():
    query = request.args.get("q", "").strip()
    if not query:
        return jsonify([])

    regex = re.compile(f".*{re.escape(query)}.*", re.IGNORECASE)

    results = collection.find({
        "role": "doctor",
        "$or": [
            {"fullName": regex},
            {"specialization": regex},
            {"address": regex},
            {"clinicName": regex},
            {"clinicAddress": regex},
        ]
    })

    output = []
    for doc in results:
        output.append({
            "id": str(doc["_id"]),
            "name": doc.get("fullName", ""),
            "specialization": doc.get("specialization", ""),
            "address": doc.get("address", ""),
            "experience": doc.get("experience", ""),
            "clinicName": doc.get("clinicName", ""),
            "clinicAddress": doc.get("clinicAddress", ""),
        })

    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
