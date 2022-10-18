import { addMedicineConstant } from "../../constant/userMedicine/addMedicine";
  
const loadAddMedicine = (id, token,medicineName,details) => ({

    type: addMedicineConstant.addMedicineLoad,
    payload: {
        id, token,medicineName,details,
    }
})

const successAddMedicine=(data)=>({
    type:addMedicineConstant.addMedicineSuccess,
    payload:data
})

const errorAddMedicine=(err)=>({
    type:addMedicineConstant.addMedicineError,
    payload:err
})
export {loadAddMedicine,successAddMedicine,errorAddMedicine}

