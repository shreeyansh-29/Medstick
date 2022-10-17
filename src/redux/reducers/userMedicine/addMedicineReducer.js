import { addMedicineConstant } from "../../constant/userMedicine/addMedicine";

const initialState={
    
    data:null,
    loading:{
        addMedicineLoader:false,
    },
    error:{
        addMedicineError:null,
    }
}

const addMedicineReducer=(state=initialState,action={})=>{
    switch (action.type)
    {
        case addMedicineConstant.addMedicineLoad:{
            return{
                ...state,
                loading:{...state.loading,addMedicineLoader:true},
                error:{...state.error,addMedicineError:null}

            }

        }
        case addMedicineConstant.addMedicineSuccess:{
            return{
                ...state,
                loading:{...state.loading,addMedicineLoader:false},
                error:{...state.error,addMedicineError:null},
                data:action.payload,
            }
        }

        case addMedicineConstant.addMedicineError:{
            return {
                ...state,
                loading:{...state.loading,addMedicineLoader:false},
                error:{...state.error,addMedicineError:action.payload},
            }
        }
        
        

        default:{
            return state;
        }
    }
}
export default addMedicineReducer;