import {medicineListConstant} from '../../constant/userMedicine/medicineListConstant';
const initialState = {
  data: null,
  loading: {
    medicineListLoader: false,
  },
  error: {
    medicineListError: null,
  },
};

const medicineListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case medicineListConstant.medicineListLoad: {
      return {
        ...state,
        loading: {...state.loading, medicineListLoader: true},
        error: {...state.error, medicineListError: null},
      };
    }
    case medicineListConstant.medicineListSuccess: {
      return {
        ...state,
        loading: {...state.loading, medicineListLoader: false},
        error: {...state.error, medicineListError: null},
        data: action.payload,
      };
    }
    case medicineListConstant.medicineListError: {
      return {
        ...state,
        loading: {...state.loading, medicineListLoader: false},
        error: {...state.error, medicineListError: action.payload},
      };
    }
    default: {
      return state;
    }
  }
};
export default medicineListReducer;
