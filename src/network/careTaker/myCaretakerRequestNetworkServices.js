import AsyncStorage from '@react-native-async-storage/async-storage';
import {MY_CARETAKER_REQUEST} from '../../../src/constants/apiUrl';
import RequestService from '../requestService';

class myCaretakerRequestNetworkServices {
  async myCaretakerRequest(payload) {
    const pageNo = payload.payload;
    const Id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('accessToken');
    return RequestService.getRequest(
      `${MY_CARETAKER_REQUEST}?patientId=${Id}&pageNo=${pageNo}&pageSize=8&Id=${Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new myCaretakerRequestNetworkServices();

