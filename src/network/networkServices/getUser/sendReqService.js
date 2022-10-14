import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {SEND_REQUEST} from '../../../constants/apiUrl';

class SendRequestService {
  async sendReq(payload) {
    const {patient_id, sentby} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.postRequest(
      `${SEND_REQUEST}?Id=${id}`,
      {
        caretakerId: id,
        patientId: patient_id,
        sentBy: sentby,
        authorized: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new SendRequestService();
