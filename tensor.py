import json
import numpy as np
import random
import nltk
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split

#nltk.download('punkt')
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

# Load intents
with open('intents.json') as file:
    data = json.load(file)

# Extract data
texts = []
labels = []
for intent in data['intents']:
    for pattern in intent['patterns']:
        texts.append(pattern)#fills patterns with question
        labels.append(intent['tag'])#fills the label with coreesponding tag



# Tokenize and lemmatize
words = []
docs = []
for i in range(len(texts)):
    tokens = nltk.word_tokenize(texts[i])#each pattern is splitted into different parts
    words.extend(tokens)
    docs.append((tokens, labels[i]))
words = [lemmatizer.lemmatize(w.lower()) for w in words if w.isalpha()]#converts into base form and removes the non-alphabetic characters
words = sorted(set(words))#creates the sorted unique list of words


# Encode labels
lbl_encoder = LabelEncoder()
labels_encoded = lbl_encoder.fit_transform(labels)

# Create training data (Bag of Words model)
training_sentences = []
training_labels = []

for doc in docs:
    bag = []
    token_words = [lemmatizer.lemmatize(w.lower()) for w in doc[0]]
    for w in words:
        bag.append(1 if w in token_words else 0)
    training_sentences.append(bag)

    output_row = lbl_encoder.transform([doc[1]])[0]
    training_labels.append(output_row)

# Convert to numpy
training_sentences = np.array(training_sentences)
training_labels = np.array(training_labels)




model = Sequential()
model.add(Dense(128, input_shape=(len(training_sentences[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(set(labels_encoded)), activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model
model.fit(training_sentences, training_labels, epochs=50, batch_size=8)
#ppppppppppppppppppppppppppppppp
import pickle

# Save the model and data
model.save("chat_model.h5")
pickle.dump(words, open("words.pkl", "wb"))
pickle.dump(lbl_encoder, open("labels.pkl", "wb"))
print("Model and data saved.")


def bag_of_words(s, words):
    bag = [0] * len(words)
    s_words = nltk.word_tokenize(s)
    s_words = [lemmatizer.lemmatize(word.lower()) for word in s_words if word.isalpha()]
    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return np.array([bag])

def chat():
    print("Chatbot is running! (type 'quit' to stop)")
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break
        results = model.predict(bag_of_words(inp, words), verbose=0)
        tag = lbl_encoder.inverse_transform([np.argmax(results)])[0]

        for tg in data["intents"]:
            if tg['tag'] == tag:
                responses = tg['responses']
        print("Bot:", random.choice(responses))

chat()
