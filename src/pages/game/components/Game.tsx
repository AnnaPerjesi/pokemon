import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React from "react";
import MainStore from "../../../stores/MainStore";
import GameStore from "../stores/GameStore";

interface IProps {
  GameStore?: GameStore;
  MainStore?: MainStore;
}

class Game extends React.Component<IProps> {
  render() {
    const { GameStore } = this.props;

    return (
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
    );
  }
}

export default inject("MainStore", "GameStore")(observer(Game));
