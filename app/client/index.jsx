import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/hello-world';

import {Provider, connect} from 'react-redux';
import {initialized} from './actions';
import configureStore from './store';

let store = configureStore({
  app: undefined
});

store.dispatch(initialized());

const App = ({auth, store}) => {
  // Boilerplate simply renders Hello, World component
  return (
    <HelloWorld />
  );
};

const ConnectedApp = connect(state => {
  return state;
})(App);

ReactDOM.render(React.createElement(ConnectedApp, { store }), document.getElementById('app'));
