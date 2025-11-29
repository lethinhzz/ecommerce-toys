import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Cổng trùng với backend
});

export default API;
