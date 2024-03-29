import { action, computed, makeObservable, observable, toJS } from 'mobx';
import MainStore from '../../../stores/MainStore';

interface ICard {
	//10 fajta kártya 1|2|3...|10
	type: number;
	show?: boolean;
}

/**
 * https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
 * @param array
 */
const shuffleArray = (array: ICard[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
};

class GameStore {
	private MainStore: MainStore;

	solvedCardIndexes: number[] = [];
	selectedCardIndexes: number[] = [];

	cards: ICard[] = [];

	currentTries: number = 0;

	bestScore: number = null;

	isLoading: boolean = false;

	constructor(mainStore: MainStore) {
		this.MainStore = mainStore;

		makeObservable(this, {
			solvedCardIndexes: observable,
			selectedCardIndexes: observable,
			cards: observable,
			currentTries: observable,
			bestScore: observable,
			isLoading: observable,
			startGame: action,
			onClickCard: action,
			setBestScore: action,
			reStart: action,
			resetGame: action,
			getAllUsedTypes: computed,
			getUnUsedType: computed,
			getCards: computed,
			checkIsEnd: computed
		});
	}

	startGame() {
		this.isLoading = true;

		this.resetGame();
		this.bestScore = 0;

		this.isLoading = false;
	}

	reStart() {
		this.isLoading = true;

		this.resetGame();

		this.isLoading = false;
	}

	resetGame() {
		this.currentTries = 0;
		this.cards = [];
		this.selectedCardIndexes = [];
		this.solvedCardIndexes = [];

		for (let i = 0; i < this.MainStore.deckSize / 2; i++) {
			const newCard: ICard = {
				type: this.getUnUsedType
			};

			this.cards.push(newCard);
		}

		this.cards = shuffleArray([...this.cards, ...this.cards]);
	}

	/**
	 * Játék végén chekkolni hogy mennyi lépésből lett kész
	 * Ha kisebb mint az eddigi akkor deállítjuk újnak, amúgy marad változatlan
	 */
	setBestScore() {
		if (!this.bestScore) {
			this.bestScore = this.currentTries;
		} else if (this.currentTries < this.bestScore) {
			this.bestScore = this.currentTries;
		}
	}

	/**
	 * ha nincs benne semmi a sleected be akkor push
	 * ha csak 1 van benne is push (+ növelni a currentTrie)
	 *    chek ugyanolyan a type ?
	 *        ha igen: push mind2 a solvedba
	 *        ha nem, wait  X sec és üríteni a selected-et
	 * ha 2 akkor ne cisnálj semmit
	 *
	 *
	 * @param cardIndex
	 */

	onClickCard(cardIndex: number) {
		const selectedCards = this.selectedCardIndexes.length;

		if (selectedCards === 0) {
			this.selectedCardIndexes.push(cardIndex);
		} else if (selectedCards === 1) {
			if (this.selectedCardIndexes.some((selectedCardItem) => selectedCardItem === cardIndex)) {
				return;
			}

			this.currentTries = this.currentTries + 1;

			this.selectedCardIndexes.push(cardIndex);

			const firstIndex = this.selectedCardIndexes[0];
			const secondIndex = this.selectedCardIndexes[1];

			if (this.getCards[firstIndex].type === this.getCards[secondIndex].type) {
				this.solvedCardIndexes = [...this.solvedCardIndexes, firstIndex, secondIndex];

				this.selectedCardIndexes = [];
			} else {
				setTimeout(() => {
					this.selectedCardIndexes = [];
				}, 1.5 * 1000);
			}

			if (this.checkIsEnd) {
				this.setBestScore();
			}
		} else {
			this.selectedCardIndexes = [];
		}
	}

	get getCards() {
		return this.cards.map((c, idx) => {
			const isSolved = this.solvedCardIndexes.some((solvedCardIndex) => solvedCardIndex === idx);
			const isSelected = this.selectedCardIndexes.some((selectedCardIndex) => selectedCardIndex === idx);

			return {
				...c,
				show: isSolved || isSelected
			};
		});
	}

	get getAllUsedTypes() {
		return this.cards.map((c) => c.type);
	}

	get getUnUsedType() {
		let rand;

		do {
			rand = Math.floor(Math.random() * 10) + 1;
		} while (this.getAllUsedTypes.indexOf(rand) > -1);

		return rand;
	}

	get checkIsEnd() {
		return this.solvedCardIndexes.length === this.getCards.length;
	}
}

export default GameStore;
