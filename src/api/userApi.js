import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const getUserInfo = () => {
    return axios.get(`${base}/user`, {headers: api.getHeaders()});
};

export const getUserListPage = params => {
    return axios.post(`${base}/user/page`, {params: params}, {headers: api.getHeaders()});
};

export const editUser = params => {
    return axios.post(`${base}/user/saveOrUpdate`, params, {headers: api.getHeaders()});
};

export const addUser = params => {
    return axios.post(`${base}/user/saveOrUpdate`, {params: params}, {headers: api.getHeaders()});
};
