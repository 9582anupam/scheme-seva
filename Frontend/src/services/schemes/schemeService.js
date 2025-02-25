import axios from "axios";
import userAuthenticatedAxiosInstance from "../users/userAuthenticatedAxiosInstance";
// const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/schemes`;
const BACKEND_URLV2 = `${process.env.REACT_APP_BACKEND_URL}/api/v2/schemes`;
const userAxiosInstance = userAuthenticatedAxiosInstance('/api/v2/schemes');

// Create axios instance with default config
const api = axios.create({
    baseURL: BACKEND_URLV2,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getFilteredSchemes = async (filters, page = 1, limit = 9) => {
    try {
        const params = {
            page,
            limit,
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
        return {
            schemes: data.schemes,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            totalSchemes: data.totalSchemes
        };
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllSchemes = async (page = 1, limit = 9) => {
    try {
        const { data } = await api.get('/get-all-schemes', {
            params: { page, limit }
        });
        return {
            schemes: data.schemes,
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            totalSchemes: data.totalSchemes
        };
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
        const response = await userAxiosInstance.post('/save-favorite-schemes', { schemeId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeFavoriteSchemes = async (schemeId) => {
    try {
        const response = await userAxiosInstance.delete(`/remove-favorite-schemes/${schemeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFavoriteSchemes = async () => {
    try {
        const response = await userAxiosInstance.get('/get-favorite-schemes');
        return response.data;
    } catch (error) {
        throw error;
    }
};