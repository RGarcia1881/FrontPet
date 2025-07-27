import axios from 'axios';

// Reemplaza con la IP o dominio de tu backend Django
const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
