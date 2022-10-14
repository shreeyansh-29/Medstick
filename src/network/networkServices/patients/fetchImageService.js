import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {FETCH_IMAGE} from '../../../constants/apiUrl';

class FetchImageService {
  async getImages(payload) {
    console.log(payload);
    const imageUrl = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');

    return await RequestService.getRequest(
      `${FETCH_IMAGE}${imageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new FetchImageService();
