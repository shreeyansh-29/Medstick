import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {CARETAKER_REQUEST} from '../../../constants/apiUrl';

class CaretakerRequestService {
  async getCaretakerRequest(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.getRequest(
      `${CARETAKER_REQUEST}?patientId=${id}&pageNo=${pageNo}&pageSize=9&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new CaretakerRequestService();
