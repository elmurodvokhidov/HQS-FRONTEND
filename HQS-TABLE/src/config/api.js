import axios from "axios";
export const baseURL = "https://hqs-backend.onrender.com";
const api = axios.create({ baseURL: baseURL + "/api" });
export default api;