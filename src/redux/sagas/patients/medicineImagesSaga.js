import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import {
  medicineImagesError,
  medicineImagesSuccess,
} from '../../action/patients/medicineImagesAction';
import getMedImagesService from '../../../network/networkServices/patients/medicineImagesService';

export function* medicineImagesSaga(data) {
  try {
    let response = yield call(getMedImagesService.getMedicineImages, data);
    yield put(medicineImagesSuccess(response?.data));
  } catch (error) {
    yield put(medicineImagesError(error));
  }
}

export function* watchMedicineImagesSaga() {
  yield takeLatest(types.USER_MED_IMAGES_REQUEST, medicineImagesSaga);
}
