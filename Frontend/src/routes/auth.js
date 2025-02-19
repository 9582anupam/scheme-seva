import { jwtDecode } from "jwt-decode";
import refreshAccessToken from "../services/users/refreshAccessToken";

export const verifyToken = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if token is expired
        if (decoded.exp < currentTime) {
            try {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    return true;
                }
                return false;
            } catch (refreshError) {
                if (refreshError.response?.status === 403) {
                    localStorage.removeItem('accessToken');
                    return false;
                }
                throw refreshError;
            }
        }

        return true;
    } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem('accessToken');
        return false;
    }
};
