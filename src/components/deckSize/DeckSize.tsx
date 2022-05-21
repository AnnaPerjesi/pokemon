import { inject, observer } from "mobx-react";
import React from "react";
import MainStore, { DECKSIZES } from "../../stores/MainStore";
import "./DeckSize.css";

interface IProps {
  MainStore?: MainStore;
}

class DeckSize extends React.Component<IProps> {
  private onClick = () => {
    let newDeckSize = DECKSIZES[0];
    let currentIndex = DECKSIZES.indexOf(this.props.MainStore?.deckSize);

    if (currentIndex + 1 < DECKSIZES.length) {
      newDeckSize = DECKSIZES[currentIndex + 1];
    }

    this.props.MainStore?.changeDeckSize(newDeckSize);
  };

  render() {
    const { MainStore } = this.props;

    return (
      <button className="button deckSize" onClick={this.onClick}>
        Deck size ({MainStore?.deckSize})
      </button>
    );
  }
}

export default inject("MainStore")(observer(DeckSize));
