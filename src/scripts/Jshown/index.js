import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import Group from './Group.js';

export default class Jshown extends Component {
	constructor(props) {
		super(props);

		this.formatJson = this.formatJson.bind(this);
		this.renderJson = this.renderJson.bind(this);
		this.getFormattedValue = this.getFormattedValue.bind(this);

		this.state = {
			json: this.formatJson(props.json)
		};
	}


	getFormattedValue(key, value, depth = 0) {
		const formattedValue = {
			name: key,
			hasChildren: false,
			childrenSize: 0,
			value,
			depth: !_.isUndefined(depth) && _.isNumber(depth) &&
				!_.isNaN(depth) ? depth + 1 : 0
		};

		if (_.isObject(value)) {
			formattedValue.type = 'Object';
			formattedValue.childrenSize = Object.keys(value).length;
		}
		if (_.isArray(value)) {
			formattedValue.type = 'Array';
			formattedValue.childrenSize = value.length;
		}
		if (_.isString(value)) {
			formattedValue.type = 'String';
		}
		if (_.isFunction(value)) {
			formattedValue.type = 'Function';
			formattedValue.value = formattedValue.value.toString();
		}
		if (_.isNumber(value)) {
			formattedValue.type = 'Number';
		}
		if (_.isUndefined(value)) {
			formattedValue.type = 'Undefined';
		}
		if (_.isNaN(value)) {
			formattedValue.type = 'NaN';
		}
		if (_.isBoolean(value)) {
			formattedValue.type = 'Boolean';
		}
		if (_.isDate(value)) {
			formattedValue.type = 'Date';
			formattedValue.value = formattedValue.value.toISOString();
		}
		if (_.isRegExp(value)) {
			formattedValue.type = 'Regex';
		}
		if (_.isError(value)) {
			formattedValue.type = 'Error';
			formattedValue.value = formattedValue.value.toString();
		}
		if (_.isNull(value)) {
			formattedValue.type = 'Null';
		}
		if (value === Infinity || value === -Infinity) {
			formattedValue.type = 'Infinity';
		}

		if ((_.isObject(value) || _.isArray(value)) &&
			!_.isFunction(value) && !_.isRegExp(value) &&
			!_.isDate(value) && !_.isError(value)) {
			formattedValue.hasChildren = true;
			formattedValue.value = Object.keys(value).map((valueKey) =>
				this.getFormattedValue(
					valueKey, value[valueKey], formattedValue.depth));
		} else {
			formattedValue.value += '';
		}

		return formattedValue;
	}


	formatJson(json) {
		return Object.keys(json).map((key) =>
			this.getFormattedValue(key, json[key]));
	}


	renderJson(json) {
		return json.map((originalValue, index) => {
			const groupProps = Object.assign({}, { index }, originalValue);
			return (
				<Group key={index} {...groupProps}>
					{this.renderValue(originalValue)}
				</Group>
			);
		}, this);
	}


	renderValue(originalValue) {
		const {
			hasChildren,
			value
		} = originalValue;

		if (hasChildren) {
			return this.renderJson(value);
		}

		return <span className="single-value">{value}</span>;
	}


	render() {
		const { json } = this.state;
		return (
			<div>
				{this.renderJson(json)}
			</div>
		);
	}
}

Jshown.propTypes = {
	json: PropTypes.object.isRequired
};
