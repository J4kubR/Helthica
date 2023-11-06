import React, { useState } from "react";
import axios from "axios";

const MainWindow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setresult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://127.0.0.1:5000/get-function/${searchQuery}`)
      .then((response) => {
        setresult(response.data.predicted_labels[0]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container rounded-5">
      <div className="left-column rounded-5">Hello 1</div>
      <div className="right-rows">
        <div className="row rounded-5 rowmarginbottom">
          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Wyszukaj choroby"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary mx-3" type="submit">
              Szukaj
            </button>
          </form>
          <p className="RESULT">{result}</p>
        </div>

        <div className="row rounded-5 ">Hello 3</div>
      </div>
    </div>
  );
};

export default MainWindow;
