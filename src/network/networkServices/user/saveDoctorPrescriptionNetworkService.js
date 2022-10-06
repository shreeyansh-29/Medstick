import AsyncStorage from '@react-native-async-storage/async-storage';
import {SAVE_DOCTOR_PRESCRIPTION} from '../../../constants/apiUrl';
import requestService from '../../requestService';

class saveDoctorPrescriptionNetworkService {
  async getUserMedicine(payload) {
    const {id} = payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    return requestService.getRequest(`${SAVE_DOCTOR_PRESCRIPTION}?Id=${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new saveDoctorPrescriptionNetworkService();
