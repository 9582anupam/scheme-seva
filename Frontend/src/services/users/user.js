import axios from 'axios';
const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`;

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/getme`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/putdata`, userData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
