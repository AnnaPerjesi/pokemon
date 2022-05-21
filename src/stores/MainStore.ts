import { action, makeObservable, observable } from "mobx";

export const DECKSIZES = [10, 14, 20];

class MainStore {
  deckSize: number = DECKSIZES[0];

  constructor() {
    makeObservable(this, {
      deckSize: observable,
      changeDeckSize: action,
    });
  }

  changeDeckSize(deckSize: number) {
    this.deckSize = deckSize;
  }
}

export default MainStore;
