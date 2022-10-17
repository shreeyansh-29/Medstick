import {saveUserMedicine} from '../../constant/userMedicine/saveUserMedicineConstant';

const initialState={
    data:null,
    loading:{
        saveUserMedicineLoader:false,
    },
    error:{
     saveUserMedicineError:null
    }
}

const saveUserMedicineReducer=(state=initialState,action={})=>{
    switch(action.type)
    {
    case saveUserMedicine.saveUserMedicineLoad:{
        return {
            ...state,
            loading:{...state.loading,saveUserMedicineLoader:true},
            error:{...state.error,saveUserMedicineError:null}
        }
    }
    case saveUserMedicine.saveUserMedicineSuccess:{
        return {
            ...state,
            loading:{...state.loading,saveUserMedicineLoader:false},
            error:{...state.error,saveUserMedicineError:null},
            data:action.payload
        }
    }
    case saveUserMedicine.saveUserMedicineError:{
        return {
            ...state,
            loading:{...state.loading,saveUserMedicineLoader:false},
            error:{...state.error,saveUserMedicineError:action.payload}
        }
    }
    default:{
        return state;
    }
    }
}
export default saveUserMedicineReducer;