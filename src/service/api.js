import axios from "axios";
import Cookies from "js-cookie";

// ✅ URL CORREGIDA: Apache en puerto 80 (HTTP estándar)
// SSH está en puerto 4022
const BASE_URL = "http://181.198.122.14:8006";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;