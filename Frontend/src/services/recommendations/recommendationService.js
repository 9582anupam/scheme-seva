const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/recommendations`;

export const getPersonalizedRecommendations = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${BACKEND_URL}/personalized`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            withCredentials: true
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommendations');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};