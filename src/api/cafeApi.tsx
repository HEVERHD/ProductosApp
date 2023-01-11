import axios from 'axios';

const baseURL = 'http://192.168.0.15:8080/api';

const cafeApi = axios.create({ baseURL: baseURL });

export default cafeApi;
