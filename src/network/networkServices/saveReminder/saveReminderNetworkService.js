import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestService from '../../requestService';
import {SAVE_REMINDER} from '../../../constants/apiUrl';

class saveReminderNetworkService {
  async saveReminder(payload) {
    const {
      fDatePrimary,
      fDateSecondary,
      days,
      title,
      time,
      check1,
      noEndDate,
      reminderStatus,
      frequencyTemp,
      food,
      totalReminders,
      currentCount,
      userMedicineId,
    } = payload.payload;
  
    const id = await AsyncStorage.getItem('user_id');
    console.log(payload,"payload");
    const token = await AsyncStorage.getItem('accessToken');
    return await RequestService.postRequest(
      `${SAVE_REMINDER}?userMedicineID=${userMedicineId}&Id=${id}`,
      {
        startDate: fDatePrimary,
        endDate: fDateSecondary,
        days: days,
        reminderTitle: title,
        reminderTime: time,
        everyday :check1,
        noEndDate: noEndDate,
        reminderStatus: reminderStatus,
        frequency: frequencyTemp,
        beforeAfter :food,
        totalReminders :totalReminders,
        currentCount :currentCount,
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
