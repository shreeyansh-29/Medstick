import { getUserMedicine } from "../../constant/userMedicine/getUserMedicineConstant";

const initialState = {
    data: null,
    loading: {
        loader: false
    },
    error:{
        error:null
    }
}

export const getUserMedicineReducer=(state=initialState,action={})=>{
    switch(action.type)
    {
        case getUserMedicine.getUserMedicineLoad:{
            return {
                ...state,
                loading:{...state.loading,loader:true},
                error:{...state.error,error:null}
            }
        }
        case getUserMedicine.getUserMedicineSuccess:{
            return{
                ...state,
                loading:{...state.loading,loader:false},
                error:{...state.error,error:null},
                data:action.payload
            }
        }
        case getUserMedicine.getUserMedicineError:{
            return {
                ...state,
                loading:{...state.loading,loader:false},
                error:{...state.error,error:action.payload}
            }
        }
        default:{
            return state
        }
    }
}