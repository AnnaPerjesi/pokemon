import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import MainStore from '../../../stores/MainStore';
import GameStore from '../stores/GameStore';

interface IProps {
	GameStore?: GameStore;
	MainStore?: MainStore;
}

class Game extends React.Component<IProps> {
	render() {
		const { GameStore } = this.props;
		if (GameStore.isLoading) return <div className="game"> Loading...</div>;

		return (
			<div className="game">
				{GameStore.getCards.map((card, idx) => {
					const cardClasses = `card ${GameStore.selectedCardIndexes.some((selectedIdx) => selectedIdx === idx) && GameStore.selectedCardIndexes.length === 2 ? 'shake' : ''}`;
					return (
						<div
							key={`${card.type}` + `${idx}`}
							className={cardClasses}
							onClick={() => {
								GameStore.onClickCard(idx);
							}}
						>
							<img src={process.env.PUBLIC_URL + (card.show ? `/assets/PNG/card-poke${card.type}.png` : `/assets/PNG/card-back.png`)} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default inject('MainStore', 'GameStore')(observer(Game));
