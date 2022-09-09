import {applyMiddleware, createStore} from 'redux';
import rootSaga from './sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducers';

const saga = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(rootSaga);

export default store;
