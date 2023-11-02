import React from "react";
import MainWindow from "./components/MainWindow";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <MainWindow />
      </Router>
    </div>
  );
};

export default App;
