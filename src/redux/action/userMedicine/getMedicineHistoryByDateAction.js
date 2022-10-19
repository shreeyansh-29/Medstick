import { getMedicineHistoryByDate } from "../../constant/userMedicine/getMedicineHistoryByDateConstant";

const loadGetMedicineHistoryByDate = (medicineById, date) => {
    return {
        type: getMedicineHistoryByDate.getMedicineHistoryByDateLoad,
        payload: {
            medicineById,date 
        }
    }
}

const successGetMedicineHistoryByDate = (data) => {
    return{
        type: getMedicineHistoryByDate.getMedicineHistoryByDateSuccess,
        payload:data
    }
}

const errorGetMedicineHistoryByDate=err=>{
    return{
        type:getMedicineHistoryByDate.getMedicineHistoryByDateError,
        payload:err
    }
}

export {loadGetMedicineHistoryByDate,successGetMedicineHistoryByDate,errorGetMedicineHistoryByDate}