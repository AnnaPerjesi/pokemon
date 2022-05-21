import React from "react";
import Button from "../../components/button/Button";
import DeckSize from "../../components/deckSize/DeckSize";
import withRouter, { WithRouter } from "../../hocs/withRouter";
import "./HomePage.css";

interface IProps extends WithRouter {}

class HomePage extends React.Component<IProps> {
  private startGame = () => this.props.navigate("/game");

  render() {
    return (
      <div className="homePage">
        <div>
          <div className="titleImg"></div>
          <div className="buttonContainer">
            <DeckSize onClick={() => {}} />
            <Button onClick={this.startGame}>Start new game</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
