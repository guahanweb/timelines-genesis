import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers/app';

const reducer = combineReducers({
  app: appReducer
});

export default function configureStore(initialState) {
  return createStore(reducer, initialState,
    applyMiddleware(thunk)
  );
}
