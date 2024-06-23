import axios from "axios";
export const baseURL = "https://hqs-backend.onrender.com/api";
const api = axios.create({ baseURL });
export default api;