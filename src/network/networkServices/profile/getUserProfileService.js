import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {GET_USER} from '../../../constants/apiUrl';

class GetUserProfileService {
  async getProfile() {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.getRequest(`${GET_USER}?userId=${id}&Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new GetUserProfileService();
