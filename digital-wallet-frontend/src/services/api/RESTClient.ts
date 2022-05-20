import axios, { AxiosRequestConfig } from 'axios';
import { store } from '../../redux';

export interface Request<T> {
    data: T;
}

export type ID = string | number;

const baseURL = process.env.REACT_APP_API_URL;

const instancesData: AxiosRequestConfig = {
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
};

const privateAxiosInstance = axios.create(instancesData)

const publicAxiosInstance = axios.create(instancesData);

privateAxiosInstance.interceptors.request.use((config) => {
    const { auth: { token } } = store.getState();
    
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { publicAxiosInstance, privateAxiosInstance };



