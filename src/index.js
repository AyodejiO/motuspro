/*jshint esversion: 9 */

import React from "react";
import ReactDOM from "react-dom";

import NextApp from './NextApp';
import register from './registerServiceWorker';
// Add this import:
import {AppContainer} from 'react-hot-loader';

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <NextApp/>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Do this once
register();

// Render once
render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
