import axios from "axios"

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})
    console.log("API BASE URL:", import.meta.env.VITE_API_URL);
    console.log("AXIOS URL:", api.defaults.baseURL);
export default api