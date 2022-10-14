import { saveDoctorPrescription } from "../../constant/doctorPrescription/saveDoctorPrescription";

export const loadSaveDoctorPrescription=(token,id,formdata)=>({
    type:saveDoctorPrescription.saveDoctorPrescriptionLoad,
    payload:{
        token,id,formdata
    }
})

export const successSaveDoctorPrescription=(data)=>({
    type:saveDoctorPrescription.saveDoctorPrescriptionSuccess,
    payload:data
})

export const errorSaveDoctorPrescription=(err)=>({
    type:saveDoctorPrescription.saveDoctorPrescriptionError,
    payload:err
})