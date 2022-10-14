import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {PATIENTS_REQUEST} from '../../../constants/apiUrl';

class PatientsRequestService {
  async getPatientsRequest(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.getRequest(
      `${PATIENTS_REQUEST}?caretakerId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new PatientsRequestService();
