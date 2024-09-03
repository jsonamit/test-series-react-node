import axiosInstance from '../config/AxiosConfig';

export const apiRequest = async (method, url, data = null) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};