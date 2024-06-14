import api from "./api";

const service = {
    // doctor
    async getDoctor(id) {
        const res = api.get(`/admin/doctors/${id}`);
        return res;
    },
    async getAllDoctor() {
        const res = api.get('/admin/doctors');
        return res;
    },

    // patient
    async getPatient(id) {
        const res = api.get(`/admin/patients/${id}`);
        return res;
    },
    async getAllPatient() {
        const res = api.get('/admin/patients');
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