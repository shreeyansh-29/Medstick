import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {DELETE_APPOINTMENT} from '../../../constants/apiUrl';

class DeleteAppointmentNetworkService {
  async deleteAppointment(payload) {
    const appointmentId= payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');

    return RequestService.putRequest(
      `${DELETE_APPOINTMENT}?appointmentId=${appointmentId}&Id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new DeleteAppointmentNetworkService();
