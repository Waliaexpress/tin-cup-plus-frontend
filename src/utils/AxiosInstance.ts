import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://jellyfish-app-xvaim.ondigitalocean.app/api/v1/",
    withCredentials: true,
    headers: {
        authorization: 'Bearer ' + (JSON.parse(localStorage.getItem('user') || 'null') || {})?.token,
    },
});

export default axiosInstance;
