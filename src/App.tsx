import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/game/GamePage";
import HomePage from "./pages/home/HomePage";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
