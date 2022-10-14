import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {MY_PRESCRIPTIONS} from '../../../constants/apiUrl';

class MyPrescriptionsService {
  async getMyPrescriptions(payload) {
    const {currentPage, Id} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.getRequest(
      `${MY_PRESCRIPTIONS}?userId=${Id}&Id=${id}&pageNo=${currentPage}&pageSize=8`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new MyPrescriptionsService();
