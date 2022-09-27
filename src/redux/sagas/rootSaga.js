import {all} from 'redux-saga/effects';
import {watchLoginSaga} from "../sagas/loginSaga/loginSaga"
import {watchSignUpSaga} from "../sagas/signUpSaga/signUpSaga"
import { watchMyCaretakerListSaga } from './caretakerSaga/listCaretakerSaga';
import { watchMyCaretakerSaga } from './caretakerSaga/myCaretakerSaga';
import { medicineListWatcherSaga } from './userMedicine/medicineListWatcherSaga';

export default function* RootSaga() {
  yield all([
    medicineListWatcherSaga(),
    watchLoginSaga(),
    watchSignUpSaga(),
    watchMyCaretakerSaga(),
    watchMyCaretakerListSaga(),
  ]);
}
