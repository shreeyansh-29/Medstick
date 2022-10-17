import { getPrescription } from "../../constant/doctorPrescription/getPrescription";

const loadGetPrescription=(id,token,pageNo,pageSize)=>({
    type: getPrescription.getPrescriptionLoad,
    payload:{
        id,token,pageNo,pageSize
    }
})

const successGetPrescription=(data)=>({
    type:getPrescription.getPrescriptionSuccess,
    payload:data
})

const errorGetPrescription=(err)=>({
    type:getPrescription.getPrescriptionError,
    payload:err
})

export {loadGetPrescription,successGetPrescription,errorGetPrescription}