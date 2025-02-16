const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/schemes`;

export const getFilteredSchemes = async (filters) => {
    try {
        const queryParams = new URLSearchParams();
        
        // Add filters to query params
        if (filters.tags) queryParams.append('tags', filters.tags);
        if (filters.gender) queryParams.append('gender', filters.gender);
        if (filters.age) queryParams.append('age', filters.age); // Removed '+' concatenation
        if (filters.incomeGroup) queryParams.append('incomeGroup', filters.incomeGroup);
        if (filters.state) queryParams.append('state', filters.state);

        const response = await fetch(`${BACKEND_URL}/get-scheme-filtered?${queryParams}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAllSchemes = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/get-all-schemes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getSchemeById = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/get-scheme-by-id/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};