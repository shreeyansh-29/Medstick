import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_DOCTOR_APPOINTMENT} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class getAppointmentNetworkService{
  async getAppointmentRequest(payload) {
    const pageNo = payload.payload;
    const Id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.getRequest(
      `${GET_DOCTOR_APPOINTMENT}?Id=${Id}&pageNo=${pageNo}&pageSize=8&userId=${Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new getAppointmentNetworkService();

