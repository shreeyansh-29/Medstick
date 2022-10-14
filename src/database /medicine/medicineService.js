import { realm } from "./addMedicineTable";
import uuid from 'react-native-uuid'
let medicines 
export const newData=(medicineName,details)=>{
    realm.write(()=>{
        medicines=realm.create('Medicine',{
            _id:uuid.v4(),
            medicineName:`${medicineName}`,
            description:`${details}`,
            // medicineDetails:[]
        })
    })
}

