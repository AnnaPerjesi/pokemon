import { Provider } from "mobx-react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GamePage from "./pages/game/GamePage";
import HomePage from "./pages/home/HomePage";
import MainStore from "./stores/MainStore";

interface IStore {
  MainStore: MainStore;
}

interface IProps {}

class App extends React.Component<IProps> {
  private stores: IStore = null;

  constructor(props: IProps) {
    super(props);

    this.stores = {
      MainStore: new MainStore(),
    };
  }

  render() {
    return (
      <Provider {...this.stores}>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="game" element={<GamePage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
