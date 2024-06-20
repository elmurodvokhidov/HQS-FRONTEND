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
    // doctor
    async doctorLogin(doctor) {
        const res = api.post('/doctors/login', doctor);
        return res;
    },
    async doctorInfo() {
        const res = api.get('/doctors/info');
        return res;
    },

    // patient
    async getPatient(id) {
        const res = api.get(`/doctors/patients/${id}`);
        return res;
    },
    async getAllPatient() {
        const res = api.get('/doctors/patients');
        return res;
    },
    async markSeen(id) {
        const res = api.put(`/doctors/patients/${id}/seen`);
        return res;
    },
    async deletePatient(id) {
        const res = api.delete(`/doctors/patients/${id}`);
        return res;
    },
};

export default service;