import { configureStore } from "@reduxjs/toolkit";
import symptomSlice from "../slices/symptomSlice";
import patientSlice from "../slices/patientSlice";
import doctorSlice from "../slices/doctorSlice";

export const store = configureStore({
    reducer: {
        symptom: symptomSlice,
        patient: patientSlice,
        doctor: doctorSlice,
    }
});