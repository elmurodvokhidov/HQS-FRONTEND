import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    patient: null,
    patients: [],
    isError: null
}

const PatientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        patientStart: (state) => {
            state.isLoading = true;
        },
        patientSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload.type === "one") {
                state.patient = action.payload?.data;
            }
            else if (action.payload.type === "more") {
                state.patients = action.payload?.data;
            }
            else if (action.payload.type === "add") {
                state.patients.push(action.payload?.data);
            }
            else if (action.payload.type === "update") {
                state.patients = state.patients.map(patient => patient?._id === action.payload?.data?._id ? action.payload?.data : patient);
            }
            else if (action.payload.type === "delete") {
                state.patients = state.patients.filter(patient => patient?._id !== action.payload?.data);
            }
        },
        patientFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
    }
});

export const {
    patientStart,
    patientSuccess,
    patientFailure,
} = PatientSlice.actions;
export default PatientSlice.reducer;