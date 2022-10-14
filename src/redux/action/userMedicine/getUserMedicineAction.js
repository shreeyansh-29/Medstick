import { getUserMedicine } from "../../constant/userMedicine/getUserMedicineConstant";

const loadGetUserMedicine=()=>{
return {
    type:getUserMedicine.getUserMedicineLoad,
   
}
}

const successGetUserMedicine=data=>{
    return {
        type:getUserMedicine.getUserMedicineSuccess,
        payload:data
    }
}

const errorGetUserMedicine=error=>{
    return{
        type:getUserMedicine.getUserMedicineError,
        payload:error
    }
}

export {loadGetUserMedicine,successGetUserMedicine,errorGetUserMedicine}