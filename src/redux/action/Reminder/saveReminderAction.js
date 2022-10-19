import * as types from '../../actionTypes';

export const saveReminderRequest = (
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
) => {
  return {
    type: types.SAVE_REMINDER_REQUEST,
    payload: {
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
    },
  };
};
export const saveReminderSuccess = data => {
  return {
    type: types.SAVE_REMINDER_SUCCESS,
    payload: data,
  };
};
export const saveReminderError = err => {
  return {
    type: types.SAVE_REMINDER_ERROR,
    payload: err,
  };
};
