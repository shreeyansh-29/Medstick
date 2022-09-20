import axios from 'axios';
class RequestService {
  getRequest(url, token) {
    console.log(`Bearer ${token}`, 'bearer');
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  postRequest(url, object) {
    return axios.post(url, object);
  }
  putRequest(url, object) {
    return axios.put(url, object);
  }
  deleteRequest(url) {
    return axios.delete(url);
  }
}
export default new RequestService();
