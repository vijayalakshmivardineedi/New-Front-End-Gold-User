// axios.js
import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:2000/api/user', // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json',
    },
});

const token = window.localStorage.getItem('UserToken');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2000/api/user', // Replace with your API base URL
    headers: {
        "Authorization": token ? `Bearer ${token}` : ''
    }
});

export default axiosInstance;
export { Api };
