import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras import layers
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer
from sklearn.preprocessing import LabelEncoder
from keras.preprocessing.sequence import pad_sequences

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# Load the dataset
dataset = pd.read_csv("./archive/Symptom2Disease.csv")

# Assuming your dataset has 'text' and 'label' columns
X = dataset["text"]
y = dataset["label"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)
y_test_encoded = label_encoder.transform(y_test)

# Tokenize the text data
tokenizer = Tokenizer()
tokenizer.fit_on_texts(X_train)

# Convert text data to sequences of indices
X_train_sequences = tokenizer.texts_to_sequences(X_train)
X_test_sequences = tokenizer.texts_to_sequences(X_test)

# Pad sequences to a fixed length
maxlen = 1000  # Adjust as needed based on your data
X_train_padded = pad_sequences(
    X_train_sequences, maxlen=maxlen, padding="post", truncating="post"
)
X_test_padded = pad_sequences(
    X_test_sequences, maxlen=maxlen, padding="post", truncating="post"
)

# Define the model
num_classes = len(label_encoder.classes_)
model = keras.Sequential(
    [
        layers.Embedding(
            input_dim=len(tokenizer.word_index) + 1, output_dim=100, input_length=maxlen
        ),
        layers.Flatten(),
        layers.Dense(num_classes, activation="softmax"),
    ]
)

# Compile the model
model.compile(
    optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"]
)

# Train the model
epochs = 5
batch_size = 18

model.fit(
    X_train_padded,
    y_train_encoded,
    epochs=epochs,
    batch_size=batch_size,
    validation_data=(X_test_padded, y_test_encoded),
)


# Evaluate the model
test_loss, test_accuracy = model.evaluate(X_test_padded, y_test_encoded)

model.save("AI_pred_v1.h5")


def AI_prediction(model, tokenizer, max_sequence_length, sentences):
    # Tokenize and pad the input sentences
    sequences = tokenizer.texts_to_sequences(sentences)
    padded_sequences = pad_sequences(
        sequences, maxlen=max_sequence_length, padding="post", truncating="post"
    )

    # Make predictions
    predictions = model.predict(padded_sequences)

    # Convert predictions to class labels
    predicted_labels = np.argmax(predictions, axis=1)

    # Convert numerical labels back to disease names
    predicted_diseases = label_encoder.inverse_transform(predicted_labels)

    return predicted_diseases
