import AsyncStorage from '@react-native-async-storage/async-storage';
import {SEARCH_MEDICINE} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class searchMedicineNetworkService{
  async searchMedicineRequest(payload) {
    const pageNo = payload.payload;
    const Id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    const medicineName = payload;
    console.log(Id,"id");
    
    return RequestService.getRequest(
      `${SEARCH_MEDICINE}?medicineName=${medicineName}&pageNo=0&pageSize=8&Id=${Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new searchMedicineNetworkService();

