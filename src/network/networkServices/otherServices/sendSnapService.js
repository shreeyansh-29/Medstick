import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {SEND_SNAP} from '../../../constants/apiUrl';

class SendSnapService {
  async sendSnap(payload) {
    console.log(payload);
    const formdata = payload.payload;
    
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.postRequest(`${SEND_SNAP}?Id=${id}`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
export default new SendSnapService();
