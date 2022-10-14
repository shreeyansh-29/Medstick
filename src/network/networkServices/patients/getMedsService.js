import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {PATIENT_MEDICINES} from '../../../constants/apiUrl';

class GetMedicinesService {
  async getGetMedicines(payload) {
    const medicineId = payload.payload;
  
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');

    return await RequestService.getRequest(
      `${PATIENT_MEDICINES}?userMedicineId=${medicineId}&Id=${id}&pageNo=0&pageSize=9`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new GetMedicinesService();
