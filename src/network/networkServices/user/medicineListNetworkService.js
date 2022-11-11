import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {USER_MEDICINE} from '../../../constants/apiUrl';

class MedicineListNetworkService {
  async getUserMedicine(payload) {
    const Id = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.getRequest(`${USER_MEDICINE}?userId=${Id}&Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new MedicineListNetworkService();
