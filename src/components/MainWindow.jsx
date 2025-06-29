import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

function formatTime(dateString) {
  const date = new Date(dateString);
  return `${date.getUTCHours().toString().padStart(2, "0")}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("pl-PL", options);
}

const MainWindow = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [patients, setPatients] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  let recognition;

  // Check if browser supports Web Speech API
  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Enable continuous recognition
    recognition.interimResults = true; // Get interim results for real-time transcription
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let fullTranscript = "";

      // Loop through all results and combine both interim and final results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }

      // Update transcript state to the combined transcript so far
      setTranscript(fullTranscript);
    };
  }

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-users`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error loading patients:", error);
      }
    };

    fetchPatients();
    const interval = setInterval(fetchPatients, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript("");
    recognition.start();
  };

  const handleStopListening = () => {
    setIsListening(false);
    recognition.stop(); // Stop continuous listening
    handleDiseasePrediction(transcript); // Trigger disease prediction after stopping
  };

  const handleDiseasePrediction = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-function/${query}`);
      setDiseaseResult(response.data.predicted_labels[0]);
    } catch (error) {
      console.error("Error fetching disease result:", error);
    }
  };

  const handleNavigation = (direction) => {
    setCurrentIndex((prevIndex) =>
      direction === "next"
        ? Math.min(prevIndex + 1, patients.length - 1)
        : Math.max(prevIndex - 1, 0)
    );
  };

  const currentPatient = patients[currentIndex];

  return (
    <div className="container rounded-5">
      <div className="left-column rounded-5">
        <div className="border border-4 border-success-subtle rounded-4 p-2">
          <div className="d-flex">
            <button
              className="btn btn-success mx-2 px-2"
              onClick={() => handleNavigation("prev")}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <h4 className="fw-bold fst-normal text-light m-1 mx-3">
              Todays Patients
            </h4>
            <button
              className="btn btn-success mx-3 px-2"
              onClick={() => handleNavigation("next")}
              disabled={currentIndex === patients.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className="border border-4 my-3 border-success-subtle rounded-4">
          {patients.length > 0 && currentPatient && (
            <div>
              <img
                className="rounded-5 m-2 border border-3 border-success thumbnail"
                src={currentPatient.picture_url}
                alt={`Picture of ${currentPatient.name}`}
              />
              <p>{currentPatient.name}</p>
              <div className="d-grid">
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle">
                  Address: {currentPatient.address}
                </p>
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle">
                  Age: {currentPatient.age}
                </p>
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle">
                  Last Visit: {formatDate(currentPatient.last_doctor_visit)}
                </p>
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle textlength">
                  Description: {currentPatient.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right-rows">
        <div className="row rounded-5 rowmarginbottom">
          <div className="justify-content-end">
            <button
              className="btn btn-success m-2 rounded-circle p-4"
              onClick={handleStartListening}
              disabled={isListening}
            >
              Start
            </button>
            <button
              className="btn btn-success m-2 rounded-circle p-4"
              onClick={handleStopListening}
              disabled={!isListening}
            >
              Stop
            </button>
          </div>
          <div>
            {transcript && <p className="RESULT">Voice Input: {transcript}</p>}
            {transcript && diseaseResult && (
              <p className="RESULT">Predicted Disease: {diseaseResult}</p>
            )}
          </div>
        </div>

        <div className="row rounded-5">
          <table className="table table-success table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Name:</th>
                <th scope="col">Illness:</th>
                <th scope="col">Time of Arrival:</th>
                <th scope="col">Time of Leave:</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {patients.slice(0, 7).map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.description_timetable}</td>
                  <td>{formatTime(item.date_time)}</td>
                  <td>{formatTime(item.date_time_finish)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
