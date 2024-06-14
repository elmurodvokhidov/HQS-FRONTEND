import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import symptomSlice from "../slices/symptomSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        symptom: symptomSlice,
    }
});