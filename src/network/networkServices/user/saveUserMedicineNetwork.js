import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_MEDICINE} from '../../../constants/apiUrl';
import requestService from '../../requestService';

class UserMedicineNetworkService {
  async getUserMedicine(payload) {
    const {id} = payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    return requestService.getRequest(`${SAVE_MEDICINE}?userId=${id}&medicineId=${id}&Id=${id}&prescriptionId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new UserMedicineNetworkService();

