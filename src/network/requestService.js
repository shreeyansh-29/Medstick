import axios from 'axios';
class RequestService {
  getRequest(url, headers) {
    return axios.get(url, headers);
  }
  postRequest(url, object, headers) {
    return axios.post(url, object, headers);
  }
  putRequest(url, object, headers) {
    console.log("axiossUrl",url);
    console.log("axiossHeaders",headers);
    console.log("axiossObject",object);
    return axios.put(url, object, headers);
  }
  deleteRequest(url) {
    return axios.delete(url);
  }
}
export default new RequestService();
