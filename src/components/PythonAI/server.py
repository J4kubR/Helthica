from flask import Flask, request, jsonify
from flask_cors import CORS
from AIsolution import AI_prediction, tokenizer, maxlen
from keras.models import load_model

app = Flask(__name__)
CORS(app)


model = load_model("./AI_pred_v1.h5")


@app.route("/get-function", methods=["POST"])
def get_function():
    data = request.get_json()
    sentences = data.get("sentences")
    predicted_labels = AI_prediction(model, tokenizer, maxlen, sentences)
    return jsonify({"predicted_labels": predicted_labels})


if __name__ == "__main__":
    app.run(debug=True)
