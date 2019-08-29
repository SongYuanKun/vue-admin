import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const saveOrUpdateCategory = params => {
    return axios.post(`${base}/category/saveOrUpdate`, params, {headers: api.getHeaders()});
};
export const getCategoryList = params => {
    return axios.post(`${base}/category/page`, params, {headers: api.getHeaders()});
};

export const selectCategory = type => {
    return axios.get(`${base}/category/select?type=` + type, {headers: api.getHeaders()});
};
export const deleteCategory = id => {
    return axios.get(`${base}/category/delete/` + id, {headers: api.getHeaders()});
};
