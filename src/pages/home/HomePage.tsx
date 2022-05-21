import React from "react";
import Button from "../../components/button/Button";
import DeckSize from "../../components/deckSize/DeckSize";
import "./HomePage.css";

interface IProps {}

class HomePage extends React.Component<IProps> {
  render() {
    return (
      <div className="homePage">
        <div>
          <div className="titleImg"></div>
          <div className="buttonContainer">
            <DeckSize onClick={() => {}}>Deck size</DeckSize>
            <Button onClick={() => {}}>Start new game</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
