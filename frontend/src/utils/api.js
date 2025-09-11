// utils/API.js or api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hyperlocal-service-marketplace-b09j.onrender.com/api',
});

const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default API;
