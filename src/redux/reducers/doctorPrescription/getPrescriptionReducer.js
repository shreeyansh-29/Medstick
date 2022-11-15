import {getPrescription} from '../../constant/doctorPrescription/getPrescription';

const initialState = {
  data: null,
  loading: {
    getPrescriptionLoader: false,
  },
  error: {
    getPrescriptionError: null,
  },
};

export const getPrescriptionReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case getPrescription.getPrescriptionLoad: {
      return {
        ...state,
        loading: {...state.loading, getPrescriptionLoader: true},
        error: {...state.error, getPrescriptionError: null},
      };
    }
    case getPrescription.getPrescriptionSuccess: {
      return {
        ...state,
        loading: {...state.loading, getPrescriptionLoader: false},
        error: {...state.error, getPrescriptionError: null},
        data: action.payload.result,
      };
    }
    case getPrescription.getPrescriptionError: {
      return {
        ...state,
        loading: {...state.loading, getPrescriptionLoader: false},
        error: {...state.error, getPrescriptionError: action.payload},
      };
    }
    default: {
      return state;
    }
  }
};
export default getPrescriptionReducer;
