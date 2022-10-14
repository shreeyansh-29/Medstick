import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {PATIENT_REMINDERS} from '../../../constants/apiUrl';

class PatientRemindersService {
  async getPatientReminders(payload) {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    const medId = payload.payload;
    return await RequestService.getRequest(
      `${PATIENT_REMINDERS}?userMedicineID=${medId}&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new PatientRemindersService();
