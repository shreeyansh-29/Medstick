import instance from '../network/instance';

function Promises() {
  addAdditionUrl = async () => {
    let response = await instance.postRequest();
    return response;
  };
}
export default Promises();
