import axios from 'axios';
class RequestService {
  getRequest(url, object) {
    return axios.get(url, object);
  }
  postRequest(url, object, headers) {
    return axios.post(url, object, headers);
  }
  putRequest(url, object, headers) {
    return axios.put(url, object, headers);
  }
  deleteRequest(url) {
    return axios.delete(url);
  }
}
export default new RequestService();
