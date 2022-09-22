import axios from 'axios';
class RequestService {
  getRequest(url, object) {
    return axios.get(url, object);
  }
  postRequest(url, object) {
    return axios.post(url, object);
  }
  putRequest(url, object, headers) {
    console.log(object);
    return axios.put(url, object, headers);
  }
  deleteRequest(url) {
    return axios.delete(url);
  }
}
export default new RequestService();
