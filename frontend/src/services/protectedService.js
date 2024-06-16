import axios from 'axios';
import authHeader from '../utils/authHeader';

const API_URL = 'http://localhost:8000/api/';

const getProtectedData = () => {
    return axios.get(API_URL + 'protected/', { headers: authHeader() });
};

export default getProtectedData;