import {clearMedicineList} from '../redux/action/userMedicine/medicineListAction';
import {AddMedicine, getMedicine, savePrescription} from '../utils/storage';

const fetchUserMedicine = (userMedicine, dispatch) => {
  let updatedList = [];
  let prescriptionList = [];
  getMedicine().then(data => {
    if (data === null || data.length === 0) {
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
          prescriptionList.some(
            ele => ele.prescriptionId === obj.prescriptionId,
          )
            ? null
            : prescriptionList.push(obj);
        }
        item.historyList = [];
        item.doctorAppointmentList = [];
        item.isSynced = true;
        updatedList.push(item);
      });
      AddMedicine(updatedList);
      savePrescription(prescriptionList);
    }
  });

  dispatch(clearMedicineList());
};
export default fetchUserMedicine;
