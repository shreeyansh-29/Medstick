import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {GET_MEDICINE_HISTORY} from '../../../constants/apiUrl';

class GetMedicinesHistoryService {
  async getGetMedicinesHistory(payload) {
    const medicineId = payload.payload;

    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');

    return await RequestService.getRequest(
      `${GET_MEDICINE_HISTORY}?userMedicineId=${medicineId}&Id=${id}&pageNo=0&pageSize=9`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new GetMedicinesHistoryService();
