import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {MEDICINE_NOTES} from '../../../constants/apiUrl';

class MedicineNotesNetworkService {
  async MedicineNotes(payload) {
    const {notes, userMedicineId} = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.putRequest(
      `${MEDICINE_NOTES}?userMedicineId=${userMedicineId}&Id=${id}`,
      {
        notes: notes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new MedicineNotesNetworkService();
