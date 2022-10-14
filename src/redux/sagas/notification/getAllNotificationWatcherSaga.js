import {call, put, takeLatest} from 'redux-saga/effects';
import notificationNetworkService from '../../../network/networkServices/notification/notificationNetworkService';
import { errorGetAllNotification, successGetAllNotification } from '../../action/notification/getAllNotification';
import { getAllNotification } from '../../constant/notification/getAllNotificationConstant';

export function* getAllNotificationWorkerSaga(data)
{
    const {payload}=data
    try
    {
     const response=yield call(notificationNetworkService.getAllNotification,payload)
     yield put(successGetAllNotification(response?.data))

    }
    catch(error)
    {
        yield put(errorGetAllNotification(error))
    }
}

export function* getAllNotificationWatcherSaga(){
    yield takeLatest(getAllNotification.getAllNotificationLoad,getAllNotificationWorkerSaga)
}