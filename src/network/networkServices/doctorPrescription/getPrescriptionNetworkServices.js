import requestService from '../../requestService';
import {GET_ALL_PRESCRIPTION} from '../../../constants/apiUrl';

class GetPrescriptionNetworkSerive {
  getPrescription(payload) {
    const {token, id, pageNo} = payload;
    return requestService.getRequest(
      `${GET_ALL_PRESCRIPTION}?userId=${id}&Id=${id}&pageNo=${pageNo}&pageSize=8`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new GetPrescriptionNetworkSerive();
