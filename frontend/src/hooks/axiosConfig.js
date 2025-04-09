import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:"http://localhost:8080" 
    baseURL:"https://quotelive.onrender.com"
    
})

export default axiosInstance