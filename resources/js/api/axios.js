import axios from 'axios'
import {LocalStorage} from "quasar";

const api = axios.create({ baseURL: '/' })

api.defaults.withCredentials = true;
api.defaults.headers.common['Accept'] = 'application/json';
// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Adding bearer token to header
    // config.headers['Authorization'] = `Bearer ${LocalStorage.getItem('access_token')}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export { api }
