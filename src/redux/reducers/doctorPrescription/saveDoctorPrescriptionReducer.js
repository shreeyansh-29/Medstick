import { saveDoctorPrescription } from "../../constant/doctorPrescription/saveDoctorPrescription";

const initialState = {
    data: null,
    loading: {
        loader: false
    },
    error: {
        err: null
    }
}

export const saveDoctorPrescriptionReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case saveDoctorPrescription.saveDoctorPrescriptionLoad: {
            return {
                ...state,
                loading: { ...state.loading, loader: true },
                error: { ...state.error, err: null }
            }
        }
        case saveDoctorPrescription.saveDoctorPrescriptionSuccess: {
            return {
                ...state,
                loading: { ...state.loading, loader: false },
                error: { ...state.error, err: null },
                data: action.payload
            }
        }

        case saveDoctorPrescription.saveDoctorPrescriptionError: {
            return {
                ...state,
                loading: { ...state.loading, loader: false },
                error: { ...state.error, err: action.payload }
            }
        }
        default: {
            return state;
        }
    }

}