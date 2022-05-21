import React from "react";
import "./DeckSize.css";

interface IProps {
  onClick: () => void;
  children?: string;
}

class DeckSize extends React.Component<IProps> {
  render() {
    const { children, onClick } = this.props;

    return (
      <button className="button deckSize" onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default DeckSize;
