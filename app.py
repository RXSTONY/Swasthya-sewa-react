from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
import re

app = Flask(__name__)

# MongoDB connection with status check
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=3000)
    db = client["hospital"]
    collection = db["doctors"]
    client.server_info()  # Check connection
    print("✅ Connected to MongoDB!")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/search")
def search():
    query = request.args.get("q", "")
    print("📦 Received search query:", query)  # Debug line
    regex = re.compile(f".*{query}.*", re.IGNORECASE)

    results = collection.find({
        "$or": [
            {"name": regex},
            {"specialization": regex},
            {"location": regex}
        ]
    })

    output = []
    for doc in results:
        print("✅ Match found:", doc)  # Debug line
        output.append({
            "name": doc.get("name", ""),
            "specialization": doc.get("specialization", ""),
            "location": doc.get("location", ""),
            "fee": doc.get("fee", ""),
            "rating": doc.get("rating", "")
        })

    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
