import React, { Component } from 'react';
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


	render() {
		const { json } = this.state;
		return (
			<div>
				{this.renderJson(json)}
			</div>
		);
	}


	formatJson(json) {
		return Object.keys(json).map((key) =>
			this.getFormattedValue(key, json[key]));
	}


	getFormattedValue(key, value, depth = 0) {
		const formattedValue = {
			name: key,
			hasChildren: false,
			childrenSize: 0,
			value: value,
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
		if (_.isObject(value) || _.isArray(value)) {
			formattedValue.hasChildren = true;
			formattedValue.value = Object.keys(value).map((valueKey) =>
				this.getFormattedValue(valueKey, value[valueKey], formattedValue.depth));
		}
		if (_.isString(value)) {
			formattedValue.type = 'String';
		}
		if (_.isFunction(value)) {
			formattedValue.type = 'Function';
		}
		if (_.isNumber(value)) {
			formattedValue.type = 'Number';
		}

		return formattedValue;
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
}
