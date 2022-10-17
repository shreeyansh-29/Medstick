import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {
  USER_MEDICINE,
  SAVE_MEDICINE,
  SAVE_USER_MEDICINE,
} from '../../../constants/apiUrl';

class UserMedicineNetworkService {
  async getUserMedicine(payload) {
    const Id = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.getRequest(`${USER_MEDICINE}?userId=${Id}&Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  postSaveMedicine(payload) {
    const {id, token, medicineName, details} = payload;
    console.log(id, token, medicineName, details, 'payload');
    return RequestService.postRequest(
      `${SAVE_MEDICINE}?Id=${id}`,
      {
        medicineName: medicineName,
        description: details,
        present: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  postSaveUserMedicine(payload) {
    const {
      id,
      token,
      medicineId,
      prescriptionId,
      pill,
      dose,
      doseType,
      stock,
      remainingStock,
    } = payload;
    console.log(payload, 'payload');
    return RequestService.postRequest(
      `${SAVE_USER_MEDICINE}?userId=${id}&medicineId=${medicineId}&Id=${id}&prescriptionId=${prescriptionId}`,
      {
        dosageType: pill,
        dosageQuantity: dose,
        dosageUnit: parseInt(doseType),
        stock: parseInt(stock),
        leftStock: parseInt(remainingStock),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new UserMedicineNetworkService();
