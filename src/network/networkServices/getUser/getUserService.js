import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {GET_USER_EMAIL} from '../../../constants/apiUrl';

class GetUserService {
  async getUser(payload) {
    const email = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    const userName = await AsyncStorage.getItem('user_name');
    return await RequestService.getRequest(
      `${GET_USER_EMAIL}?email=${email}&sender=${userName}&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new GetUserService();
