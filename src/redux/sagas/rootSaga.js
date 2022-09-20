import {all} from 'redux-saga/effects';
import { medicineListWatcherSaga } from './userMedicine/medicineListWatcherSaga';

export default function* RootSaga() {
  yield all([
    medicineListWatcherSaga()
  ]);
}
