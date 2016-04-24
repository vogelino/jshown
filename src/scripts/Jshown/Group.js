import React, { Component } from 'React';

export default class Group extends Component {
	constructor(props) {
		super(props);

		this.toggleGroupOpen = this.toggleGroupOpen.bind(this);
		this.state = {
			isOpen: false
		};
	}

	render() {
		const {
			index, name, type, hasChildren,
			childrenSize, depth,
			children
		} = this.props;
		const { isOpen } = this.state;

		const classes = [
			'json-group',
			isOpen ? 'open' : 'closed',
			type,
			`childrens-${childrenSize}`,
			hasChildren ? 'with-children' : 'without-children'
		].join(' ');

		return (
			<div key={index} id={`${depth}-${index}`} className={classes}>
				<label className="key-label" onClick={this.toggleGroupOpen}>
					{name} ({type}{childrenSize ? ' ' + childrenSize : ''}):
				</label>
				<div className="value-container">
					{children}
				</div>
			</div>
		);
	}

	toggleGroupOpen() {
		this.setState({ isOpen: !this.state.isOpen });
	}
}
