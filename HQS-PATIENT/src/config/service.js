import api from "./api";
import { getCookie } from "./cookiesService";

// interceptor
api.interceptors.request.use((req) => {
    if (getCookie("x-token")) {
        req.headers.Authorization = getCookie("x-token")
    };
    return req;
});

const service = {
    // patient
    async registerPatient(patient) {
        const res = api.post('/patients/register', patient);
        return res;
    },
    async loginPatient(patient) {
        const res = api.post('/patients/login', patient);
        return res;
    },
    async patientInfo() {
        const res = api.get('/patients/info');
        return res;
    },

    // symptom
    async getAllSymptom() {
        const res = api.get('/admin/symptoms');
        return res;
    },
    async getSymptom(id) {
        const res = api.get(`/admin/symptoms/${id}`);
        return res;
    },
};

export default service;