import AsyncStorage from "@react-native-async-storage/async-storage"
import requestService from "../../requestService";
import { GET_MEDICINE_HISTORY_BY_DATE } from "../../../constants/apiUrl";
class getMedicineHistoryByDateNetworkService {
    async getMedicineHistoryByDate(payload) {
        const { date, userMedicineId } = payload
        const Id = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('accessToken');
return requestService.getRequest(`${GET_MEDICINE_HISTORY_BY_DATE}?date=${date}&userMedicineId=${userMedicineId}`,{
    headers: {
        Authorization: `Bearer ${token}`,
      },
})
    }
}
export default new getMedicineHistoryByDateNetworkService();