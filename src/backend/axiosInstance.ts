import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://nbw1f8c7-3000.use2.devtunnels.ms/',
    baseURL: 'http://localhost:3000',
})

export default axiosInstance;