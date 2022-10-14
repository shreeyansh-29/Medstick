import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {ACCEPT_REQUEST} from '../../../constants/apiUrl';

class AcceptRequestService {
  async putAcceptRequest(payload) {
    const requestId = payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.putRequest(
      `${ACCEPT_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new AcceptRequestService();
