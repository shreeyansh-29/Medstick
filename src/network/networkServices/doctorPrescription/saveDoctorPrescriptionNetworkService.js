import requestService from "../../requestService"
import { SAVE_DOCTOR_PRESCRIPTION } from "../../../constants/apiUrl"
class saveDoctorPrescriptionNetworkService {
    saveDoctorPrescription(payload) {
        const { token, id, formdata } = payload
        console.log(formdata, 'fff');
        return requestService.postRequest(`${SAVE_DOCTOR_PRESCRIPTION}?Id=${id}`,formdata , {
            headers: {
                Authorization: `Bearer ${token}`,   
                'Content-Type': 'multipart/form-data',
            }
        })
    }
}

export default new saveDoctorPrescriptionNetworkService();