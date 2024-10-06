from flask import Flask, request, jsonify
from flask_cors import CORS
from AIsolution import AI_prediction, tokenizer, maxlen
import keras
import mysql.connector


app = Flask(__name__)
CORS(app)

model = keras.saving.load_model(
    "./AI_pred_v1.h5", custom_objects=None, compile=True, safe_mode=True
)


def find_database():
    mysql_connection = mysql.connector.connect(
        host="localhost", user="root", password="password", database="Patients"
    )
    cursor = mysql_connection.cursor()
    query = "SELECT * from users"
    cursor.execute(query)
    rows = cursor.fetchall()
    cursor.close()
    mysql_connection.close()

    return rows


@app.route("/get-users", methods=["GET"])
def get_database():
    rows = find_database()
    users = []
    for row in rows:
        id, name, address, age, last_doctor_visit, description, picture_url = row
        user_data = {
            "id": id,
            "name": name,
            "address": address,
            "age": age,
            "last_doctor_visit": last_doctor_visit,
            "description": description,
            "picture_url": picture_url,
        }
        users.append(user_data)
    return jsonify(users)


# getting the app to query a prediction then send it to the web server
@app.route("/get-function/<query>", methods=["GET"])
def get_function(query):
    sentences = [query]
    predicted_labels = AI_prediction(model, tokenizer, maxlen, sentences).tolist()
    return jsonify({"predicted_labels": predicted_labels})


if __name__ == "__main__":
    app.run(debug=True)
