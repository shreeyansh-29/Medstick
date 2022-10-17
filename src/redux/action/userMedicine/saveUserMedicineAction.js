import { saveUserMedicine } from "../../constant/userMedicine/saveUserMedicineConstant";

const loadSaveUserMedicine=(id,token,prescriptionId,medicineId,pill,dose,doseType,stock,remainingStock)=>({
    type: saveUserMedicine.saveUserMedicineLoad,
    payload:{
        id,token,prescriptionId,medicineId,pill,dose,doseType,stock,remainingStock,
    }
})

const successSaveUserMedicine=(data)=>({
    type:saveUserMedicine.saveUserMedicineSuccess,
    payload:data
})

const errorSaveUserMedicine=(err)=>({
    type:saveUserMedicine.saveUserMedicineError,
    payload:err
})

export {loadSaveUserMedicine,successSaveUserMedicine,errorSaveUserMedicine}