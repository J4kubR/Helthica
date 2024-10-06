import React, { useEffect, useState } from "react";
import axios from "axios";

const MainWindow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setresult] = useState(null);
  const [patients, setPatients] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // used an effect such that it will automatically get the patient database
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/get-users")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => console.error("Error loading patients:", error));
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
            <h4 className="fw-bold fst-normal text-light m-1 mx-3">Pacjenci</h4>
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
                className="rounded-5 m-2 border border-3 border-success"
                src={currentPatient.picture_url}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              <p>{currentPatient.name}</p>
              <div className="d-grid ">
                <p className="fst-normal">Adres: {currentPatient.address}</p>
                <p className="fst-normal">Wiek: {currentPatient.age}</p>
                <p className="fst-normal">
                  Ostatnia Wizyta: {currentPatient.last_doctor_visit}
                </p>
                <p className="fst-normal d-flex">
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

        <div className="row rounded-5 ">Hello 3</div>
      </div>
    </div>
  );
};

export default MainWindow;
