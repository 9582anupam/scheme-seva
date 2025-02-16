import axios from "axios";
import refreshAccessToken from "./refreshAccessToken";
// import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`,
    withCredentials: true, // Include cookies with requests
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        // const navigate = useNavigate();
        if (error.response.status === 403) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                // error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance.request(error.config);
            } else {
                console.error("Failed to refresh access token");
                localStorage.removeItem("accessToken");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
