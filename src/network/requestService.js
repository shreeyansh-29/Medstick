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
}
export default new RequestService();
