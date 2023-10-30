from flask import Flask
from flask_cors import CORS
from AIsolution import AIprediction

app = Flask(__name__)
CORS(app)


@app.route("/get-function/<int:index>", methods=["GET"])
def get_function(index):
    result = AIprediction(index)
    return {"result": result}


if __name__ == "__main__":
    app.run(debug=True)
