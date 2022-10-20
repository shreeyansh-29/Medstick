import { getMedicineHistoryByDate } from "../../constant/userMedicine/getMedicineHistoryByDateConstant";

const initialstate={
    data:null,
    loading:{
        loader:false
    },
    error:{
        error:null
    }
}

const getMedicineHistoryByDateReducer=(state=initialstate,action={})=>{
switch(action.type)
{
 case getMedicineHistoryByDate.getMedicineHistoryByDateLoad:{
    return{
        ...state,
        loading:{...state.loading,loader:true},
        error:{...state.error,error:null}
    }
 }   
 case getMedicineHistoryByDate.getMedicineHistoryByDateSuccess:{
    return{
        ...state,
        loading:{...state.loading,loader:false},
        error:{...state.error,error:null},
        data:action.payload
    }
 }
 case getMedicineHistoryByDate.getMedicineHistoryByDateError:{
    return{
        ...state,
        loading:{...state.loading,loader:false},
        error:{...state.error,error:action.payload}
    }
 }
 default:{
    return state;
 }
}
}

export default getMedicineHistoryByDateReducer