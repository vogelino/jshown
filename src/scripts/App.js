import React, { Component } from 'react';
import exampleJson from './exampleJson';
import Jshown from './Jshown';

export default class App extends Component {
    render() {
		return (
            <Jshown json={exampleJson} />
        );
    }
}