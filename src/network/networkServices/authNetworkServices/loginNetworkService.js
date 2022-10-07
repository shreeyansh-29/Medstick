import RequestService from '../../requestService';
import {LOGIN} from '../../../constants/apiUrl';
class LoginNetworkService {
  login(payload) {
    const {email, token} = payload.payload;
    return RequestService.postRequest(LOGIN, {
      fcmToken: token,
      email: email,
    });
  }
}
export default new LoginNetworkService();

