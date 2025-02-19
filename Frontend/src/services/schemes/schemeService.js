import axios from "axios";
// const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/schemes`;
const BACKEND_URLV2 = `${process.env.REACT_APP_BACKEND_URL}/api/v2/schemes`;

// Create axios instance with default config
const api = axios.create({
    baseURL: BACKEND_URLV2,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getFilteredSchemes = async (filters) => {
    try {
        const params = {
            ...(filters.search && { search: filters.search }),
            ...(filters.schemeName && { schemeName: filters.schemeName }),
            ...(filters.openDate && { openDate: filters.openDate }),
            ...(filters.closeDate && { closeDate: filters.closeDate }),
            ...(filters.state && { state: filters.state }),
            ...(filters.nodalMinistryName && { nodalMinistryName: filters.nodalMinistryName }),
            ...(filters.level && { level: filters.level }),
            ...(filters.category && { category: filters.category }),
            ...(filters.gender && { gender: filters.gender }),
            ...(filters.incomeGroup && { incomeGroup: filters.incomeGroup })
        };

        const { data } = await api.get('/get-filtered-schemes', { params });
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllSchemes = async () => {
    try {
        const { data } = await api.get('/get-all-schemes');
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getSchemeById = async (id) => {
    try {
        const { data } = await api.get(`/get-scheme-by-id/${id}`);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const saveFavoriteSchemes = async (schemeId) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }

        const { data } = await api.post('/save-favorite-schemes',
            { schemeId },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const removeFavoriteSchemes = async (schemeId) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await api.delete(`/remove-favorite-schemes/${schemeId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};



export const getFavoriteSchemes = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await api.get('/get-favorite-schemes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data || []; // Ensure we return an array
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};