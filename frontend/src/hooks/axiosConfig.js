import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://quotelive.onrender.com"
})

export default axiosInstance