import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const saveOrUpdateCategory = params => {
    return axios.post(`${base}/article/saveOrUpdate`, params, {headers: api.getHeaders()});
};
export const getCategoryList = params => {
    return axios.post(`${base}/article/page`, params, {headers: api.getHeaders()});
};

export const deleteCategory = id => {
    return axios.get(`${base}/article/saveOrUpdate/`+id, {headers: api.getHeaders()});
};
