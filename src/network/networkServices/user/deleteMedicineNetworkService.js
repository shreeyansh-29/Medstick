import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {DELETE_MEDICINE} from '../../../constants/apiUrl';

class DeleteMedicineNetworkService {
  async deleteMedicine(payload) {
    const userMedicineId = payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');

    return RequestService.putRequest(
      `${DELETE_MEDICINE}?userMedicineId=${userMedicineId}&Id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new DeleteMedicineNetworkService();
