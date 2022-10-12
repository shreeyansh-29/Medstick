import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {MY_CARETAKER} from '../../../constants/apiUrl';

class MyCaretakerService {
  async getMyCaretaker(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.getRequest(
      `${MY_CARETAKER}?patientId=${id}&pageNo=${pageNo}&pageSize=7&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new MyCaretakerService();
