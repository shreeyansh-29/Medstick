import {getAllMedicineHistoryClear} from '../redux/action/userMedicine/getAllMedicineHistoryAction';
import {getAppointmentListClear} from '../redux/action/userMedicine/getAppointmentListAction';
import {clearMedicineList} from '../redux/action/userMedicine/medicineListAction';
import {
  AddMedicine,
  getMedicine,
  getPrescription,
  savePrescription,
} from '../utils/storage';
import {StoreProviderService} from '../utils/storeProviderService';

const fetchUserMedicine = async (
  userMedicine,
  appointmentList,
  historyList,
) => {
  let prescriptionList = [];
  getPrescription()
    .then(data => {
      if (data !== null && data?.length !== 0) {
        prescriptionList = data;
      }
    })
    .then(() => {
      getMedicine()
        .then(data => {
          // console.log('fetch data at start', data);
          if (data === null || data.length === 0) {
            // console.log('data in 1st condition', data);
            let updatedList = [];
            userMedicine.map(item => {
              if (item.prescriptionId !== null) {
                let obj = {
                  doctorName: item.doctorName,
                  prescriptionId: item.prescriptionId,
                  contact: item.contact,
                  prescriptionUrl: item.prescriptionUrl,
                  location: item.location,
                  specialization: item.specialization,
                };

                !prescriptionList.some(
                  ele => ele.prescriptionId === obj.prescriptionId,
                ) && prescriptionList.push(obj);
              }

              item.historyList = [];
              historyList !== null &&
                historyList.map(ele => {
                  if (ele.userMedicineId === item.userMedicineId) {
                    ele.userMedicineHistory.map(r => {
                      r.synced = true;
                    });
                    item.historyList = ele.userMedicineHistory;
                  }
                });

              item.doctorAppointmentList = [];
              appointmentList !== null &&
                appointmentList.map(ele => {
                  if (ele.userMedicineId === item.userMedicineId) {
                    item.doctorAppointmentList = ele.doctorAppointmentList;
                  }
                });

              if (item.reminderId !== null) {
                item.everyday = !item.everyday ? false : true;
                item.noEndDate = !item.noEndDate ? false : true;
                item.reminderStatus = !item.reminderStatus ? false : true;
              }
              item.present = !item.present ? false : true;
              item.flag = !item.flag ? false : true;
              item.isSynced = true;
              updatedList.push(item);
            });

            // console.log('Updateddata inside null condition', updatedList);

            AddMedicine(updatedList);
            savePrescription(prescriptionList);
          } else if (data.length !== 0) {
            // console.log('Data not empty', data);
            let userMedicineList = [];
            let updatedList = data;

            data.map(item => {
              userMedicineList.push(item.userMedicineId);
            });

            userMedicine.map(item => {
              if (!userMedicineList.includes(item.userMedicineId)) {
                if (item.prescriptionId !== null) {
                  let obj = {
                    doctorName: item.doctorName,
                    prescriptionId: item.prescriptionId,
                    contact: item.contact,
                    prescriptionUrl: item.prescriptionUrl,
                    location: item.location,
                    specialization: item.specialization,
                  };
                  prescriptionList.some(
                    ele => ele.prescriptionId === obj.prescriptionId,
                  ) && prescriptionList.push(obj);
                }

                item.historyList = [];
                historyList !== null &&
                  historyList.map(ele => {
                    if (ele.userMedicineId === item.userMedicineId) {
                      ele.userMedicineHistory.map(r => {
                        r.synced = true;
                      });
                      item.historyList = ele.userMedicineHistory;
                    }
                  });

                item.doctorAppointmentList = [];
                appointmentList !== null &&
                  appointmentList.map(ele => {
                    if (ele.userMedicineId === item.userMedicineId) {
                      item.doctorAppointmentList = ele.doctorAppointmentList;
                    }
                  });

                item.everyday = !item.everyday ? false : true;
                item.flag = !item.flag ? false : true;
                item.noEndDate = !item.noEndDate ? false : true;
                item.present = !item.present ? false : true;
                item.reminderStatus = !item.reminderStatus ? false : true;
                item.isSynced = true;
                updatedList.push(item);
              }
            });

            // console.log('Before Pushing Updated data', updatedList);
            AddMedicine(updatedList);
            savePrescription(prescriptionList);
          }
        })

        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
export default fetchUserMedicine;
