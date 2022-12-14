import instance from '../network/instance';

class Promises {
  addAdditionUrl = async () => {
    let response = await instance.postRequest();
    return response;
  };
}
export default new Promises();
