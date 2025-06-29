import React from "react";
import MainWindow from "./components/MainWindow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import TimeTable from "./components/TimeTable";
import Declaration from "./components/Declaration";
import Provisions from "./components/Provisions";
import Settings from "./components/Settings";
import All_patients from "./components/All_patients";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" Component={MainWindow}></Route>
          <Route path="/TimeTable" Component={TimeTable}></Route>
          <Route path="/Patients" Component={MainWindow}></Route>
          <Route path="/Provisions" Component={Provisions}></Route>
          <Route path="/Declaration" Component={Declaration}></Route>
          <Route path="/Settings" Component={Settings}></Route>
          <Route path="/All_patients" Component={All_patients}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
