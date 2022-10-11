import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_DOCTOR_APPOINTMENT} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class saveAppointmentNetworkService {
  async saveAppointmentReminder(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const prescriptionId= await AsyncStorage.getItem('prescriptionId')

    return RequestService.postRequest(
      `${SAVE_DOCTOR_APPOINTMENT}?prescriptionId=${prescriptionId}&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new saveAppointmentNetworkService();
