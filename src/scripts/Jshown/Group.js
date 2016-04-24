import React, { Component } from 'React';

export default class Group extends Component {
	constructor(props) {
		super(props);

		this.toggleGroupOpen = this.toggleGroupOpen.bind(this);
		this.getLabel = this.getLabel.bind(this);

		this.state = {
			isOpen: false
		};
	}

	render() {
		const {
			index, type, hasChildren,
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
				{this.getLabel()}
				<div className="value-container">
					{children}
				</div>
			</div>
		);
	}

	getLabel() {
		const {
			hasChildren,
			name,
			type,
			childrenSize
		} = this.props;

		if (hasChildren) {
			return (
				<label className="key-label" onClick={this.toggleGroupOpen}>
					{name}:
					<div className="metadata">
						<span className="type">{type}</span>
						<span className="size">{childrenSize}</span>
					</div>
				</label>
			);
		}

		return (
			<label className="key-label">
				{name}:
				<div className="metadata">
					<span className="type">{type}</span>
				</div>
			</label>
		);
	}

	toggleGroupOpen() {
		this.setState({ isOpen: !this.state.isOpen });
	}
}
