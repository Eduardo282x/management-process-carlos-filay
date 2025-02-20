import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://r31q79nx-3012.use2.devtunnels.ms/',
    baseURL: 'http://localhost:3012',
})

export default axiosInstance;