import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {UPDATE_APPOINTMENT} from '../../../constants/apiUrl';

class updateAppointmentNetworkService {
  async updateAppointment(payload) {
    console.log(payload);
    const appointmentid = payload.payload.appointmentId;
    const {fDate, notes1, time} = payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');
    return RequestService.putRequest(
      `${UPDATE_APPOINTMENT}?appointmentId=${appointmentid}&Id=${id}`,
      {
        localDate: fDate,
        localTime: time,
        notes: notes1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new updateAppointmentNetworkService();
