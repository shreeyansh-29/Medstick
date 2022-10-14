import axios from 'axios';
class RequestService {
  getRequest(url, headers) {
    
    return axios.get(url, headers);
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
