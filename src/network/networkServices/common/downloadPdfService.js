import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {DOWNLOAD_PDF} from '../../../constants/apiUrl';

class DownloadPdfService {
  async downloadPdf(payload) {
    const medicineId = payload.payload;
    const token = await AsyncStorage.getItem('accessToken');
    const id = await AsyncStorage.getItem('user_id');

    return await RequestService.getRequest(
      `${DOWNLOAD_PDF}?userMedicineId=${medicineId}&Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new DownloadPdfService();
