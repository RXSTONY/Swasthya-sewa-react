
from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
import re

app = Flask(__name__)

# MongoDB connection
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=3000)
    db = client["hospital"]
    collection = db["doctors"]
    client.server_info()  # Test connection
    print("✅ Connected to MongoDB!")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/search")
def search():
    query = request.args.get("q", "")
    print("📦 Received search query:", query)
    regex = re.compile(f".*{query}.*", re.IGNORECASE)

    results = collection.find({
        "$or": [
            {"name": regex},
            {"specialization": regex},
            {"location": regex},
            {"diseases_expert": regex},
            {"nmc_number": regex}
        ]
    })

    output = []
    for doc in results:
        print("✅ Match found:", doc)
        output.append({
            "name": doc.get("name", ""),
            "specialization": doc.get("specialization", ""),
            "location": doc.get("location", ""),
            "fee": doc.get("fee", ""),
            "rating": doc.get("rating", ""),
            "diseases_expert": doc.get("diseases_expert", []),
            "nmc_number": doc.get("nmc_number", "")
        })

    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
## run this ==. http://127.0.0.1:5000/