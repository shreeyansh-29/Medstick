import AsyncStorage from "@react-native-async-storage/async-storage";
import requestService from "../../requestService";
import { GET_USER_MEDICINE } from "../../../constants/apiUrl";

class getUserMedicineNetworkService{
    async getUserMedicine()
    {
    
        const Id = await AsyncStorage.getItem('user_id');
        console.log(Id,"id")
        const token = await AsyncStorage.getItem('accessToken');
        return requestService.getRequest(`${GET_USER_MEDICINE}?userId=${Id}&Id=${Id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
    }
}

export default new getUserMedicineNetworkService();