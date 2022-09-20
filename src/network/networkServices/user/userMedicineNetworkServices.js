import RequestService from '../../requestService';
const base_url = 'https://3c39-106-51-81-179.in.ngrok.io/api/v1/user';

class UserMedicineNetworkService {
  getUserMedicine(payload) {
    const {id, token, userId} = payload;
    let url = base_url + `/medicines?userId=${id}&Id=${userId}`;
    return RequestService.getRequest(url, token);
  }
}
export default new UserMedicineNetworkService();
