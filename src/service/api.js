import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "localhost:8005",//http://201.218.28.181:8087/ http://190.110.56.75:14500/ //https://visitaecuador.com/bio-api
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken"); // localStorage.getItem('accessToken');
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
