import AsyncStorage from '@react-native-async-storage/async-storage';
import {APPOINTMENT_REMINDER} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class appointmentReminderNetworkService {
  async appointmentReminder(payload) {
    const pageNo = payload.payload
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');

    return RequestService.getRequest(
      `${APPOINTMENT_REMINDER}?userId=${id}&Id=${id}&pageNo=${pageNo}&pageSize=8`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new appointmentReminderNetworkService();
