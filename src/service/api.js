import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://181.198.122.14/8006"; // ensure protocol is included

const api = axios.create({
    baseURL: BASE_URL, // ajusta según sea necesario
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken"); // localStorage.getItem('accessToken');
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
