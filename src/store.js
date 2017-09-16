import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger';
import yusongApp from './modules/index'

const configureStore = () => {
  let store = createStore(
    yusongApp,
    applyMiddleware(
      logger
    )
  );

  return store;
};

const store = configureStore()

export default store