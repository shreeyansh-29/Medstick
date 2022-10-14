import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {NOTIFY_USER} from '../../../constants/apiUrl';

class NotifyUserService {
  async postNotification(payload) {
    const {medName, fcmToken, patientId} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    const name = await AsyncStorage.getItem('user_name');

    return await RequestService.postRequest(
      `${NOTIFY_USER}?medName=${medName}&Id=${id}&fcmToken=${fcmToken}&patientId=${patientId}`,
      {
        sender: name,
        message: 'Take Medicine ' + medName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new NotifyUserService();
