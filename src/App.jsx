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
          <Route path="/" Component={MainWindow}></Route>
          <Route path="/Terminarz" Component={TimeTable}></Route>
          <Route path="/Pacjenci" Component={MainWindow}></Route>
          <Route path="/Swiadczenia" Component={MainWindow}></Route>
          <Route path="/Deklaracje" Component={MainWindow}></Route>
          <Route path="/Ustawienia" Component={MainWindow}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
