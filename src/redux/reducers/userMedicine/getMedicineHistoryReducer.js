import {getMedicineHistory} from '../../constant/userMedicine/getMedicineHistory';

const initialState = {
  data: null,
  loading: {
    loader: false,
  },
  error: {
    error: null,
  },
};

export const getMedicineHistoryReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case getMedicineHistory.getMedicineHistoryLoad: {
      return {
        ...state,
        loading: {...state.loading, loader: true},
        error: {...state.error, error: null},
      };
    }
    case getMedicineHistory.getMedicineHistorySuccess: {
      return {
        ...state,
        loading: {...state.loading, loader: false},
        error: {...state.error, error: null},
        data: action.payload,
      };
    }
    case getMedicineHistory.getMedicineHistoryError: {
      return {
        ...state,
        loading: {...state.loading, loader: false},
        error: {...state.error, error: action.payload},
      };
    }
    default: {
      return state;
    }
  }
};
