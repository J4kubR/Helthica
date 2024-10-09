import React, { useEffect, useState } from "react";
import axios from "axios";

function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("pl-PL", options);
}

const MainWindow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setresult] = useState(null);
  const [patients, setPatients] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get-users");
        setPatients(response.data);
      } catch (error) {
        console.error("Error loading patients:", error);
      }
    };

    fetchPatients();

    const interval = setInterval(fetchPatients, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://127.0.0.1:5000/get-function/${searchQuery}`)
      .then((response) => {
        setresult(response.data.predicted_labels[0]);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < patients.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentPatient = patients[currentIndex];

  return (
    <div className="container rounded-5">
      <div className="left-column rounded-5">
        <div className="border border-4 border-success-subtle rounded-4 p-2">
          <div className="d-flex">
            <button
              className="btn btn-success mx-2 px-2"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Poprzedni
            </button>
            <h4 className="fw-bold fst-normal text-light m-1 mx-3">
              {" "}
              Dzisiejsi Pacjenci
            </h4>
            <button
              className="btn btn-success mx-3 px-2"
              onClick={handleNext}
              disabled={currentIndex === patients.length - 1}
            >
              Następny
            </button>
          </div>
        </div>
        <div className="border border-4 my-3 border-success-subtle rounded-4">
          {patients.length > 0 && currentPatient && (
            <div className="">
              <img
                className="rounded-5 m-2 border border-3 border-success thumbnail"
                src={currentPatient.picture_url}
              />
              <p>{currentPatient.name}</p>
              <div className="d-grid ">
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle">
                  Adres: {currentPatient.address}
                </p>
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle">
                  Wiek: {currentPatient.age}
                </p>
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle">
                  Ostatnia Wizyta:{" "}
                  {formatDate(currentPatient.last_doctor_visit)}
                </p>
                <p className="fs-6 font-monospace border border-4 rounded-5 mx-1 p-2 border-success-subtle textlength">
                  Informacje: {currentPatient.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right-rows">
        <div className="row rounded-5 rowmarginbottom">
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Wyszukaj choroby"
              aria-label="Search"
              id="SearchDisease"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary mx-3" type="submit">
              Szukaj
            </button>
          </form>
          <p className="RESULT"> The disease is: {result}</p>
        </div>

        <div className="row rounded-5">
          <table class="table table-success table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Imie:</th>
                <th scope="col">Problem:</th>
                <th scope="col">Godzina przyjscia:</th>
                <th scope="col">Godzina wyjscia:</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {patients.slice(0, 7).map((item, index) => (
                <tr key={index} scope="row">
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
