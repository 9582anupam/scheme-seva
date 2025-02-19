import userAuthenticatedAxiosInstance from "../users/userAuthenticatedAxiosInstance";

const userAxiosInstance = userAuthenticatedAxiosInstance('/api/v1/recommendations');

export const getPersonalizedRecommendations = async () => {
    try {
        const response = await userAxiosInstance.get('/personalized');
        return response.data;
    } catch (error) {
        throw error;
    }
};