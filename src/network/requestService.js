import axios from 'axios';
import instance from './instance';
class RequestService {
  getRequest(url) {
    return instance.get(url);
  }
  postRequest(url, object) {
    return instance.post(url, object);
  }
  putRequest(url, object) {
    return instance.put(url, object);
  }
  deleteRequest(url) {
    return instance.delete(url);
  }
  sendSnapRequest(url, object, header) {
    return axios.post(url, object, header);
  }
  refreshToken(url, object, header) {
    return axios.post(url, object, header);
  }
}
export default new RequestService();
