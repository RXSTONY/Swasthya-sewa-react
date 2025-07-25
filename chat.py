from flask import Flask, render_template, request, jsonify
import random
import json
import numpy as np
import pickle
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load saved data
model = load_model("chat_model.h5")
intents = json.loads(open("intents.json").read())
words = pickle.load(open("words.pkl", "rb"))
lbl_encoder = pickle.load(open("labels.pkl", "rb"))
lemmatizer = WordNetLemmatizer()

def bag_of_words(s, words):
    bag = [0] * len(words)
    s_words = nltk.word_tokenize(s)
    s_words = [lemmatizer.lemmatize(word.lower()) for word in s_words if word.isalpha()]
    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return np.array([bag])

@app.route("/")
def home():
    return render_template("chat.html")

@app.route("/get", methods=["POST"])
def chatbot_response():
    message = request.json.get("message")
    if message:
        input_data = bag_of_words(message, words)
        results = model.predict(input_data, verbose=0)
        tag = lbl_encoder.inverse_transform([np.argmax(results)])[0]
        for intent in intents["intents"]:
            if intent["tag"] == tag:
                return jsonify({"response": random.choice(intent["responses"])})
    return jsonify({"response": "Sorry, I didn’t understand that."})

if __name__ == "__main__":
    app.run(debug=True)
