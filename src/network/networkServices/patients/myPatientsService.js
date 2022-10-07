import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {MY_PATIENTS} from '../../../constants/apiUrl';

class MyPatientsService {
  async getMyPatients(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.getRequest(
      `${MY_PATIENTS}?caretakerId=${id}&pageNo=${pageNo}&pageSize=7&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new MyPatientsService();
