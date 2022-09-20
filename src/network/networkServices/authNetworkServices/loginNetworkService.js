import RequestService from '../../requestService';
import {LOGIN} from '../../../constants/apiUrl';

class LoginNetworkService {
  login(payload) {
    const {email, token} = payload.payload;
    return RequestService.postRequest(LOGIN, {
      email: email,
      fcmToken: token,
    });
  }
}
export default new LoginNetworkService();
