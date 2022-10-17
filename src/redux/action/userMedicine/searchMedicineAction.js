import * as types from '../../actionTypes';

export const searchMedicineRequest = (data) =>{
    return{
        type: types.SEARCH_MEDICINE_REQUEST,
        payload:data,
    }
}
export const searchMedicineSuccess = data =>{
    return{
        type: types.SEARCH_MEDICINE_SUCCESS,
        payload:data,
    }
}
export const searchMedicineError = err=>{
    return{
        type: types.SEARCH_MEDICINE_ERROR,
        payload:err,
    }
}


