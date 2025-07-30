from flask import Flask, request, jsonify
import random
import json
import numpy as np
import pickle
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["swasthya"]  # ← your database name is 'swasthya'
doctors_collection = db["users"]  # ← doctors are stored in 'users' collection

model = load_model("chat_model.h5")

with open('/Users/amishbaraili/Desktop/master/Swasthya-sewa-react-master/src/pages/intents.json') as file:
    intents = json.load(file)

words = pickle.load(open("words.pkl", "rb"))
lbl_encoder = pickle.load(open("labels.pkl", "rb"))
lemmatizer = WordNetLemmatizer()

# Symptom to specialist mapping
symptom_specialist_map = {
    "fever": ["general physician", "infectious disease"],
    "headache": ["neurologist"],
    "chest pain": ["cardiologist"],
    "stomach pain": ["gastroenterologist"],
    "skin rash": ["dermatologist"],
    "dizzy": ["neurologist", "general physician"],
    "toothache": ["dentist"],
    "back pain": ["orthopedic"],
    "joint pain": ["rheumatologist", "orthopedic"],
    "cough": ["pulmonologist", "general physician"],
    "eye pain": ["ophthalmologist"],
    "ear pain": ["ENT specialist"],
    "allergy": ["allergist"],
    "depression": ["psychiatrist", "psychologist"],
    # add more as needed
}

def bag_of_words(s, words):
    bag = [0] * len(words)
    s_words = nltk.word_tokenize(s)
    s_words = [lemmatizer.lemmatize(word.lower()) for word in s_words if word.isalpha()]
    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return np.array([bag])

@app.route("/get", methods=["POST"])
def chatbot_response():
    message = request.json.get("message")
    print("Message received from React:", message)

    if message:
        found_specialists = []
        for symptom, specialists in symptom_specialist_map.items():
            if symptom in message.lower():
                found_specialists = specialists
                break

        print("Detected specialists to search for:", found_specialists)

        if found_specialists:
            # Match doctors with role=doctor and specialization using regex
            doctors = list(doctors_collection.find({
                "role": "doctor",
                "$or": [
                    {"specialization": {"$regex": spec, "$options": "i"}}
                    for spec in found_specialists
                ]
            }))
            print(f"Found doctors from DB: {doctors}")

            doctor_list = [f"{doc['fullName']} ({doc['specialization']})" for doc in doctors]

            if doctor_list:
                response = "Based on your symptoms, you may contact:\n" + "\n".join(doctor_list)
            else:
                response = "We couldn't find any doctors currently available for this condition."

            print("Sending doctor response:", response)
            return jsonify({"response": response})

        # fallback: use trained model
        input_data = bag_of_words(message, words)
        results = model.predict(input_data, verbose=0)
        tag = lbl_encoder.inverse_transform([np.argmax(results)])[0]
        print("Predicted tag:", tag)

        for intent in intents["intents"]:
            if intent["tag"] == tag:
                response = random.choice(intent["responses"])
                print("Sending AI response:", response)
                return jsonify({"response": response})

    print("Fallback response sent")
    return jsonify({"response": "Sorry, I didn’t understand that."})

if __name__ == "__main__":
    app.run(debug=True)
