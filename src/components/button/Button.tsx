import React from 'react';
import './Button.css';

interface IProps {
	onClick: () => void;
	children?: string;
}

class Button extends React.Component<IProps> {
	render() {
		const { children, onClick } = this.props;

		return (
			<button className="button yellowButton" onClick={onClick}>
				{children}
			</button>
		);
	}
}

export default Button;
