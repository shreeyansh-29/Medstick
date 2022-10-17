import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  getMedsHistoryError,
  getMedsHistorySuccess,
} from '../../action/patients/getMedsHistoryAction';
import GetMedicinesHistoryService from '../../../network/networkServices/patients/getMedsHistoryService';

export function* getMedsHistorySaga(data) {
  try {
    let response = yield call(
      GetMedicinesHistoryService.getGetMedicinesHistory,
      data,
    );
    yield put(getMedsHistorySuccess(response?.data));
  } catch (error) {
    yield put(getMedsHistoryError(error));
  }
}

export function* watchGetMedicinesHistorySaga() {
  yield takeLatest(types.GET_MED_HISTORY_REQUEST, getMedsHistorySaga);
}
