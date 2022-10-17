import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {MEDICINE_IMAGES} from '../../../constants/apiUrl';

class GetMedImagesService {
  async getMedicineImages(payload) {
    const medicineId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');

    return await RequestService.getRequest(
      `${MEDICINE_IMAGES}?userMedicineId=${medicineId}&Id=${id}&pageNo=0&pageSize=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new GetMedImagesService();
