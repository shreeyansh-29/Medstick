const appointmentReminder = state => state.appointmentReminder.data;
const appointmentReminderLoading = state => state.appointmentReminder.isLoading;
const apppointmentReminderError = state => state.appointmentReminder.error;
const saveAppointmentReminder = state => state.saveAppointment;
const saveAppointmentReminderLoading = state => state.saveAppointment.isLoading;
const saveAppointmentReminderError = state => state.saveAppointment.error;
const getAppointment = state => state.getAppointment;
const getAppointmentLoading = state => state.getAppointment.isLoading;
const getAppointmentError = state => state.getAppointment.error;
const updateAppointment = state => state.updateAppointment;
const updateAppointmentLoading = state => state.updateAppointment.isLoading;
const updateAppointmentError = state => state.updateAppointment.error;

export const appointmentReminderSelector = {
  appointmentReminder,
  appointmentReminderLoading,
  apppointmentReminderError,
  saveAppointmentReminder,
  saveAppointmentReminderLoading,
  saveAppointmentReminderError,
  getAppointment,
  getAppointmentLoading,
  getAppointmentError,
  updateAppointment,
  updateAppointmentLoading,
  updateAppointmentError,
};
