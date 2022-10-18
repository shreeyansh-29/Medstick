import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {SAVE_REMINDER} from '../../../constants/apiUrl';

class saveReminderNetworkService {
  async saveReminder(payload) {
    const {
      fDatePrimary,
      fDateSecondary,
      selecteddaysItems,
      title,
      timearray,
      check1,
      noEndDate,
      reminderStatus,
      frequency,
      food,
      totalReminders,
      currentCount,
      userMedicineId,
    } = payload.payload;
    console.log("typpeee",frequency.toString());
    const id = await AsyncStorage.getItem('user_id');
    console.log(payload,"payload");
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.postRequest(
      `${SAVE_REMINDER}?userMedicineID=${userMedicineId}&Id=${id}`,
      {
        fDatePrimary,
        fDateSecondary,
        selecteddaysItems,
        title,
        timearray,
        check1,
        noEndDate,
        reminderStatus,
        frequency,
        food,
        totalReminders,
        currentCount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
export default new saveReminderNetworkService();
