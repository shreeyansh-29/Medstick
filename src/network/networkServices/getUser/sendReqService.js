import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {SEND_REQUEST} from '../../../constants/apiUrl';

class SendRequestService {
  async sendReq(payload) {
    const {patient_id, sentby, fcmToken} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    const body =
      sentby === 'Caretaker'
        ? {
            caretakerId: id,
            patientId: patient_id,
            sentBy: sentby,
            authorized: true,
            fcmToken: fcmToken,
          }
        : {
            caretakerId: patient_id,
            patientId: id,
            sentBy: sentby,
            authorized: true,
            fcmToken: fcmToken,
          };
    return await RequestService.postRequest(`${SEND_REQUEST}?Id=${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new SendRequestService();
