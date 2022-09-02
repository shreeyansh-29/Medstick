import {applyMiddleware, createStore} from 'redux';
import rootSaga from './sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducers';

const saga = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(saga));
// console.log('store is', store.getState());

saga.run(rootSaga);

export default store;
