import requestService from "../../requestService";
import { GET_ALL_PRESCRIPTION } from '../../../constants/apiUrl';

class GetPrescriptionNetworkSerive {
    getPrescription(payload) {
        const { token, id,pageNo,pageSize } = payload
        // console.log(id,"id")
        // console.log(pageNo,"page number")
        // console.log(pageSize,"size")
        return requestService.getRequest(`${GET_ALL_PRESCRIPTION}?userId=${id}&Id=${id}&pageNo=${pageNo}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

    }
}
export default new GetPrescriptionNetworkSerive();