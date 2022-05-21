import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
import Button from "../../components/button/Button";
import DeckSize from "../../components/deckSize/DeckSize";
import withRouter, { WithRouter } from "../../hocs/withRouter";
import MainStore from "../../stores/MainStore";
import "./GamePage.css";
import GameStore from "./stores/GameStore";

interface IProps extends WithRouter {
  MainStore?: MainStore;
}

interface IStores {
  GameStore: GameStore;
}

class GamePage extends React.Component<IProps> {
  private stores: IStores = null;

  constructor(props: IProps) {
    super(props);

    this.stores = {
      GameStore: new GameStore(this.props.MainStore),
    };
  }

  componentDidMount() {
    this.stores.GameStore.startGame();
  }

  private onClickStartGame = () => this.stores.GameStore.startGame();
  private goHome = () => this.props.navigate("/");

  render() {
    const { GameStore } = this.stores;

    return (
      <div className="gamePage">
        <div className="header">
          <div className="headerContent">
            <div className="homeButton">
              <Button onClick={this.goHome}>Home</Button>
            </div>

            <DeckSize />
            <Button onClick={this.onClickStartGame}>Start new game</Button>
          </div>
        </div>

        <div className="content">
          <div className="statusBar">
            <div>
              Current tries: <span className="number">0</span>
            </div>
            <div>
              Best: <span className="number">9</span>
            </div>
            <div>
              <Button onClick={() => {}}>Restart</Button>
            </div>
          </div>
          <div className="game">
            {GameStore.getCards.map((card, idx) => {
              return (
                <div
                  key={`${card.type}` + `${idx}`}
                  className="card"
                  onClick={() => {
                    GameStore.onClickCard(idx);
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      (card.show
                        ? `/assets/PNG/card-poke${card.type}.png`
                        : `/assets/PNG/card-back.png`)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default inject("MainStore")(observer(withRouter(GamePage)));
