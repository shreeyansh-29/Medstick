import {syncDataRequest} from '../redux/action/userMedicine/syncDataAction';
import {getMedicine} from '../utils/storage';

const syncMedicine = dispatch => {
  getMedicine()
    .then(data => {
      if (data !== null && data.length !== 0) {
        let updatedList = data;
        let syncArray = [];
        updatedList.map(item => {
          if (item.isSynced === false) {
            let obj = {
              userMedicineId: item.userMedicineId,
              medicineId: item.medicineId,
              medicineName: item.medicineName,
              description: item.description,
              present: item.present,
              dosageType: item.dosageType,
              dosageQuantity: item.dosageQuantity,
              dosagePower: item.dosagePower,
              stock: item.stock,
              leftStock: item.leftStock,
              reminderId: item.reminderId,
              startDate: item.startDate,
              endDate: item.endDate,
              days: item.days,
              reminderTitle: item.reminderTitle,
              reminderTime: item.reminderTime,
              everyday: item.everyday,
              noEndDate: item.noEndDate,
              reminderStatus: item.reminderStatus,
              frequency: item.frequency,
              beforeAfter: item.beforeAfter,
              totalReminders: item.totalReminders,
              currentCount: item.currentCount,
              prescriptionId: item.prescriptionId,
              doctorName: item.doctorName,
              specialization: item.specialization,
              contact: item.contact,
              location: item.location,
              prescriptionUrl: item.prescriptionUrl,
              doctorAppointmentList: item.appointmentList,
              flag: item.flag,
            };
            syncArray.push(obj);
          }
        });
        syncArray?.length !== 0 ? dispatch(syncDataRequest(syncArray)) : null;
      }
    })
    .catch(err => console.log(err));
};

export default syncMedicine;
