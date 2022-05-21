import { makeObservable, observable, toJS } from 'mobx';
import { inject, observer, Provider } from 'mobx-react';
import React from 'react';
import withRouter, { WithRouter } from '../../hocs/withRouter';
import MainStore from '../../stores/MainStore';
import GameContainer from './components/GameContainer';
import GameStore from './stores/GameStore';

interface IProps extends WithRouter {
	MainStore?: MainStore;
}

interface IStores {
	GameStore: GameStore;
}

class GamePage extends React.Component<IProps> {
	public stores: IStores = null;

	constructor(props: IProps) {
		super(props);

		this.stores = {
			GameStore: new GameStore(this.props.MainStore)
		};
	}

	componentDidMount() {
		this.stores.GameStore.startGame();
	}

	render() {
		const { GameStore } = this.stores;

		return (
			<Provider {...this.stores}>
				<GameContainer />
			</Provider>
		);
	}
}

export default inject('MainStore')(observer(withRouter(GamePage)));
