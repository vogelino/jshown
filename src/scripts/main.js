/* global document */
/* global window */

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

window.addEventListener('load', () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
});
