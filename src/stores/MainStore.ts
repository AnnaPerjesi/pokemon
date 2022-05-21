import { action, makeObservable, observable } from "mobx";

export const DECKSIZES = [8, 14, 20];

class MainStore {
  deckSize: number = 8;

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
