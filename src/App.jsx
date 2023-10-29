import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import MainPage from "./components/MainPage";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <NavigationBar />
        <MainPage />
      </div>
    </>
  );
}

export default App;
