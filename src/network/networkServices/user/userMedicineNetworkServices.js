import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_MEDICINE} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class UserMedicineNetworkService {
  getUserMedicine(payload) {
    console.log(payload);
    const {id} = payload.payload;
    const token = await AsyncStorage.getItem('accessToken')
    return RequestService.getRequest(`${USER_MEDICINE}?userId=${id}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new UserMedicineNetworkService();
