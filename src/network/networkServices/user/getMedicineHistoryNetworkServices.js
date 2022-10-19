import requestService from "../../requestService";
import { GET_MEDICINE_HISTORY } from "../../../constants/apiUrl";

class getMedicineHistoryNetworkSerive{
 async getMedicineHistoryBydate(payload){
 const {medicineId}=payload
 const Id = await AsyncStorage.getItem('user_id');
 const token = await AsyncStorage.getItem('accessToken');
 return requestService.getRequest(`${GET_MEDICINE_HISTORY}?userMedicineId=${medicineId}&Id=${Id}&pageNo=0&pageSize=2`,
 {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },)
 }   
}
export default new getMedicineHistoryNetworkSerive();