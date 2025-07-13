import axios from 'axios';
import { Alert } from 'react-native';
import { Platform } from 'react-native';

const apiClient = axios.create({
    baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
    timeout: 10000,
});

apiClient.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('API Error:', error.response?.data || error.message);
        Alert.alert('API Error', 'An unexpected error occurred. Please try again.');
        return Promise.reject(error);
    }
);

export default apiClient;