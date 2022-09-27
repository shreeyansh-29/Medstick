import {SIGN_UP} from '../../../constants/apiUrl';
import RequestService from '../../requestService';

class SignUpNetworkService {
  async signUp(payload) {
    const {name, email, photo, token} = payload.payload;
    return RequestService.postRequest(SIGN_UP, {
      userName: name,
      email: email,
      contact: '1234567890',
      picPath: photo,
      fcmToken: token,
    });
  }
}
export default new SignUpNetworkService();
