import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_DOCTOR_APPOINTMENT} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class saveAppointmentNetworkService {
  async saveAppointmentReminder(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const prescriptionId = await AsyncStorage.getItem('prescriptionId');
    const token = await AsyncStorage.getItem('accessToken');
    const {fDate, time, notes1} = payload;
    console.log(prescriptionId,"p_id");

    return RequestService.postRequest(
      `${SAVE_DOCTOR_APPOINTMENT}?prescriptionId=${prescriptionId}&Id=${id}`,
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
export default new saveAppointmentNetworkService();
