import axios from 'axios';

// Reemplaza con la IP o dominio de tu backend Django
const BASE_URL = 'http://192.168.0.231:8000/api/v1/';

//Lab http://192.168.0.231:8000/api/v1/
//LabVLAD http://10.177.120.206:8000/api/v1/
//House http://192.168.1.209:8000/api/v1/

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
