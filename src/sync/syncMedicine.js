import {
  syncDataClear,
  syncDataRequest,
} from '../redux/action/userMedicine/syncDataAction';
import {getMedicine} from '../utils/storage';
import {StoreProviderService} from '../utils/storeProviderService';

async function syncMedicine(dispatch) {
  if (
    StoreProviderService.internetStatus &&
    StoreProviderService.userLoggedIn
  ) {
    getMedicine()
      .then(data => {
        // console.log('sync Data arry', data);
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
                doctorAppointmentList: item.doctorAppointmentList,
                flag: item.flag,
              };
              syncArray.push(obj);
            }
          });
          // console.log('syncing Array', syncArray);
          syncArray?.length !== 0 ? dispatch(syncDataRequest(syncArray)) : null;
        }
        StoreProviderService.dispatch(syncDataClear());
      })
      .catch(err => console.log(err));
  } else return;
}

export default syncMedicine;
