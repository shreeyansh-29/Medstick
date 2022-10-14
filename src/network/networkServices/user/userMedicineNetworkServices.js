import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {USER_MEDICINE} from '../../../constants/apiUrl';

class UserMedicineNetworkService {
  async getUserMedicine(payload) {
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');
    const Id = payload.payload;

    return RequestService.getRequest(`${USER_MEDICINE}?userId=${Id}&Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new UserMedicineNetworkService();
