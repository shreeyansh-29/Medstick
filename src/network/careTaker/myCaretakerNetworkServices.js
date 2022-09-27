import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_MY_CARETAKER} from '../../../src/constants/apiUrl';
import RequestService from '../requestService';

class myCaretakerNetworkServices {
  async myCaretaker(payload) {
    const pageNo = payload.payload;
    const Id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.getRequest(
      `${GET_MY_CARETAKER}?patientId=${Id}&pageNo=${pageNo}&pageSize=2&Id=${Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new myCaretakerNetworkServices();

