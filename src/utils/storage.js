import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddMedicine=async(data)=>{
    try{
        await AsyncStorage.setItem('AddMedicine',JSON.stringify(data))
        console.log('save',data)
    }
    catch(error)
    {
        console.log(error)
    }
}

export const getMedicine=async()=>{
    try{
        const response=JSON.parse(await AsyncStorage.getItem('AddMedicine'))
        
    return response
    
    }
    catch(error){
        console.log(error)
    }
}