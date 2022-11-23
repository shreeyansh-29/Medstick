import AsyncStorage from '@react-native-async-storage/async-storage';
import requestService from '../../requestService';
import {GET_ALL_NOTIFICATION} from '../../../constants/apiUrl';
import {DELETE_NOTIFICATION} from '../../../constants/apiUrl';
class notificationNetworkService {
  async getAllNotification(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const {pageNo} = payload;
    const token = await AsyncStorage.getItem('accessToken');
    return await requestService.getRequest(
      `${GET_ALL_NOTIFICATION}?Id=${id}&userId=${id}&pageNo=${pageNo}&pageSize=3`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async deleteNotification(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');

    const {notificationId} = payload;
    return await requestService.putRequest(
      `${DELETE_NOTIFICATION}?Id=${id}&notificationId=${notificationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new notificationNetworkService();
