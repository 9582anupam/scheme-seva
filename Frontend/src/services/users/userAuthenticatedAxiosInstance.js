import axios from "axios";
import refreshAccessToken from "./refreshAccessToken";

const createAxiosInstance = (endpoint, setIsUserLoggedIn) => {
    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        withCredentials: true,
    });

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            if (error.response?.status === 403) {
                const newAccessToken = await refreshAccessToken(setIsUserLoggedIn);
                if (newAccessToken) {
                    return axiosInstance.request(error.config);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default createAxiosInstance;
