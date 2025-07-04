from flask import Flask, jsonify
from flask_cors import CORS
from AIsolution import AI_prediction, tokenizer, maxlen
import keras
import mysql.connector


app = Flask(__name__)
CORS(app)

model = None


def load_model():
    global model
    if model is None:
        model = keras.saving.load_model(
            "./AI_pred_v1.h5", custom_objects=None, compile=True, safe_mode=True
        )


def find_database(queryname):
    mysql_connection = mysql.connector.connect(
        host="localhost", user="root", password="password", database="Patients"
    )
    cursor = mysql_connection.cursor()
    query = queryname
    cursor.execute(query)
    rows = cursor.fetchall()
    cursor.close()
    mysql_connection.close()

    return rows


@app.route("/get-users", methods=["GET"])
def get_database():
    rows = find_database(
        "select users.name, users.description,address, age, last_doctor_visit,timetable.description, date_time, date_time_finish, picture_url from timetable, users where users.id = timetable.id and DATE(date_time) = curdate() and TIME(date_time_finish) > curtime() order by date_time"
    )
    users = []
    for row in rows:
        (
            name,
            description,
            address,
            age,
            last_doctor_visit,
            description_timetable,
            date_time,
            date_time_finish,
            picture_url,
        ) = row
        user_data = {
            "name": name,
            "address": address,
            "age": age,
            "last_doctor_visit": last_doctor_visit,
            "description": description,
            "picture_url": picture_url,
            "description_timetable": description_timetable,
            "date_time": date_time,
            "date_time_finish": date_time_finish,
        }
        users.append(user_data)
    return jsonify(users)


# getting the app to query a prediction then send it to the web server
@app.route("/get-function/<query>", methods=["GET"])
def get_function(query):
    load_model()
    sentences = [query]
    try:
        predicted_labels = AI_prediction(model, tokenizer, maxlen, sentences).tolist()
        return jsonify({"predicted_labels": predicted_labels})
    except Exception as e:
        print("Prediction error came as: {e}")
        return jsonify("Prediction failed"), 500


if __name__ == "__main__":
    app.run(debug=True)
