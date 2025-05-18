import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://jellyfish-app-xvaim.ondigitalocean.app/api/v1/",
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('tin-cup-token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
