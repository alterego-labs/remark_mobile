import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import Reactotron from 'reactotron';

const enhancer = compose(
  // If you have other enhancers..
  Reactotron.storeEnhancer()
)

const store = createStore(
  reducers,
  enhancer
);

// Reactotron.addReduxStore(store);

export default store;
