import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_DOCTOR_APPOINTMENT} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class SaveAppointmentNetworkService {
  async saveAppointmentReminder(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    const {fDate, time, notes1, notes} = payload.payload;

    return RequestService.postRequest(
      `${SAVE_DOCTOR_APPOINTMENT}?prescriptionId=${notes}&Id=${id}`,
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
export default new SaveAppointmentNetworkService();
