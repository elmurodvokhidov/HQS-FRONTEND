import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import patientSlice from "../slices/patientSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        patient: patientSlice,
    }
});