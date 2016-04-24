import React, { Component } from 'react';
import _ from 'underscore';

export default class Jshown extends Component {
	constructor(props) {
		super(props);

		this.formatJson = this.formatJson.bind(this);
		this.renderJson = this.renderJson.bind(this);
		this.getFormattedValue = this.getFormattedValue.bind(this);
	}


	render() {
		const { json } = this.props;
		const formattedJson = this.formatJson(json);
		return (
			<div>
				{this.renderJson(formattedJson)}
			</div>
		);
	}


	formatJson(json) {
		return Object.keys(json).map((key) =>
			this.getFormattedValue(key, json[key]));
	}


	getFormattedValue(key, value) {
		const formattedValue = {
			name: key,
			hasChildren: false,
			childrenSize: 0,
			isOpen: true,
			value
		};

		if (_.isObject(value)) {
			formattedValue.type = 'object';
			formattedValue.hasChildren = true;
			formattedValue.childrenSize = Object.keys(value).length;
			formattedValue.value = Object.keys(value).map((valueKey) =>
				this.getFormattedValue(valueKey, value[valueKey]));
			formattedValue.isOpen = false;
		}
		if (_.isArray(value)) {
			formattedValue.type = 'array';
			formattedValue.hasChildren = true;
			formattedValue.childrenSize = value.length;
			formattedValue.value = Object.keys(value).map((valueKey) =>
				this.getFormattedValue(valueKey, value[valueKey]));
			formattedValue.isOpen = false;
		}
		if (_.isString(value)) {
			formattedValue.type = 'string';
		}
		if (_.isFunction(value)) {
			formattedValue.type = 'function';
		}
		if (_.isNumber(value)) {
			formattedValue.type = 'number';
		}

		return formattedValue;
	}


	renderJson(json) {
		return json.map((originalValue, index) => {
			const {
				name,
				type,
				hasChildren,
				childrenSize,
				isOpen
			} = originalValue;

			const classes = [
				'json-group',
				isOpen ? 'open' : 'closed',
				type,
				`childrens-${childrenSize}`,
				hasChildren ? 'with-children' : 'without-children'
			].join(' ');

			return (
				<div key={index} className={classes}>
					<label className="key-label">
						{name} ({type}{childrenSize ? ' ' + childrenSize : ''}):
					</label>
					<div className="value-container">
						{this.renderValue(originalValue)}
					</div>
				</div>
			);
		});
	}


	renderValue(originalValue) {
		const {
			hasChildren,
			value
		} = originalValue;

		if (hasChildren) {
			return this.renderJson(value);
		}

		return <span>{value}</span>;
	}
}
