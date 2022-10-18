import * as types from '../../actionTypes';

export const saveReminderRequest = (
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
) => {
  return {
    type: types.SAVE_REMINDER_REQUEST,
    payload: {
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
