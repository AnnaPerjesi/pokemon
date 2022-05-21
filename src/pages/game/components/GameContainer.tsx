import { makeObservable, observable, toJS } from 'mobx';
import { inject, observer, Provider } from 'mobx-react';
import React from 'react';
import Button from '../../../components/button/Button';
import DeckSize from '../../../components/deckSize/DeckSize';
import withRouter, { WithRouter } from '../../../hocs/withRouter';
import MainStore from '../../../stores/MainStore';
import GameStore from '../stores/GameStore';
import Game from './Game';
import './GameContainer.css';

interface IProps extends WithRouter {
	MainStore?: MainStore;
	GameStore?: GameStore;
}

class GameContainer extends React.Component<IProps> {
	private onClickStartGame = () => this.props.GameStore.startGame();
	private onClickRestartGame = () => this.props.GameStore.reStart();
	private goHome = () => this.props.navigate('/');

	render() {
		const { GameStore } = this.props;

		console.log('currentTries', GameStore.currentTries);

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
							Current tries: <span className="number">{GameStore.currentTries}</span>
						</div>
						<div>
							Best: <span className="number">{GameStore.bestScore || '-'}</span>
						</div>
						<div>
							<Button onClick={this.onClickRestartGame}>Restart</Button>
						</div>
					</div>
					<Game />
				</div>
			</div>
		);
	}
}

export default inject('MainStore', 'GameStore')(withRouter(observer(GameContainer)));
