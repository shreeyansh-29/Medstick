import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {SAVE_REMINDER} from '../../../constants/apiUrl';

class getReminderNetworkService {
  async getReminder(payload) {
    const email = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.getRequest(
      `${SAVE_REMINDER}?userMedicineID=${email}&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new getReminderNetworkService();


