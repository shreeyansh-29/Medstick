import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {DELETE_REQUEST} from '../../../constants/apiUrl';

class DeleteRequestService {
  async putDeleteRequest(payload) {
    const requestId = payload.payload;
    console.log(payload,"payloaddddd");
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.putRequest(
      `${DELETE_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new DeleteRequestService();
