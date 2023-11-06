import React from "react";
import MainWindow from "./components/MainWindow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import TimeTable from "./components/TimeTable";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" Component={MainWindow}></Route>
          <Route path="/Terminarz" Component={TimeTable}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
