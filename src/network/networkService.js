import RequestService from './requestService';
import * as apiUrl from '../constants/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NetworkService {
  async login(payload) {
    const {email, token} = payload.payload;
    return await RequestService.postRequest(apiUrl.LOGIN, {
      fcmToken: token,
      email: email,
    });
  }
  async signUp(payload) {
    const {name, email, photo, token} = payload.payload;
    return RequestService.postRequest(apiUrl.SIGN_UP, {
      userName: name,
      email: email,
      contact: '1234567890',
      picPath: photo,
      fcmToken: token,
    });
  }
  async getMyPatients(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.MY_PATIENTS}?caretakerId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
    );
  }
  async getPatientsRequest(payload) {
    const currentPage = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.PATIENTS_REQUEST}?caretakerId=${id}&pageNo=${currentPage}&pageSize=8&Id=${id}`,
    );
  }
  async getMyCaretaker(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.MY_CARETAKER}?patientId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
    );
  }
  async getCaretakerRequest(payload) {
    const pageNo = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.getRequest(
      `${apiUrl.CARETAKER_REQUEST}?patientId=${id}&pageNo=${pageNo}&pageSize=8&Id=${id}`,
    );
  }
  async searchMedicineRequest(payload) {
    const Id = await AsyncStorage.getItem('user_id');
    const {med, pageNo} = payload.payload;

    return RequestService.getRequest(
      `${apiUrl.SEARCH_MEDICINE}?medicineName=${med}&pageNo=${pageNo}&pageSize=8&Id=${Id}`,
    );
  }
  async putAcceptRequest(payload) {
    const requestId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');

    return await RequestService.putRequest(
      `${apiUrl.ACCEPT_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
    );
  }
  async putDeleteRequest(payload) {
    const requestId = payload.payload;
    const id = await AsyncStorage.getItem('user_id');
    return await RequestService.putRequest(
      `${apiUrl.DELETE_REQUEST}?requestId=${requestId}&Id=${id}`,
      {},
    );
  }
}
export default new NetworkService();
