import { getMedicineHistory } from "../../constant/userMedicine/getMedicineHistory";

const loadGetMedicineHistory=(date)=>{
    return {
        type:getMedicineHistory.getMedicineHistoryLoad,
        payload:{
            date
        }
    }
}

const successGetMedicineHistory=data=>{
    return{
        type:getMedicineHistory.getMedicineHistorySuccess,
        payload:data
    }
}

const errorGetMedicineHistory=error=>{
    return {
        type:getMedicineHistory.getMedicineHistoryError,
        payload:error
    }
}

export {loadGetMedicineHistory,successGetMedicineHistory,errorGetMedicineHistory}