import { prescriptionData } from "../../constant/userMedicine/prescriptionData";

const successPrescriptionData=data=>({
    type:prescriptionData.prescriptionData,
    payload:data,
})

export {successPrescriptionData}