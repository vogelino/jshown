import React, { Component, PropTypes } from 'react';

export default class Group extends Component {
	constructor(props) {
		super(props);

		this.toggleGroupOpen = this.toggleGroupOpen.bind(this);
		this.getLabel = this.getLabel.bind(this);

		this.state = {
			isOpen: false
		};
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
			</label>
		);
	}

	toggleGroupOpen() {
		this.setState({ isOpen: !this.state.isOpen });
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
			type.toLowerCase(),
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
}

Group.propTypes = {
	hasChildren: PropTypes.bool,
	name: PropTypes.string,
	type: PropTypes.string,
	childrenSize: PropTypes.number,
	index: PropTypes.number,
	depth: PropTypes.number,
	children: PropTypes.element
};
