import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const saveOrUpdateArticle = params => {
    return axios.post(`${base}/article/saveOrUpdate`, params, {headers: api.getHeaders()});
};

export const updateStatus = params => {
    return axios.post(`${base}/article/update/status`, params, {headers: api.getHeaders()});
};

export const getArticleInfo = id => {
    return axios.get(`${base}/article/info/` + id, {headers: api.getHeaders()});
};
export const deleteById = id => {
    return axios.get(`${base}/article/delete/` + id, {headers: api.getHeaders()});
};

export const getArticleList = params => {
    return axios.post(`${base}/article/page`, params, {headers: api.getHeaders()});
};
export const getPublicArticleList = params => {
    return axios.post(`${base}/article/publicPage`, params, {headers: api.getHeaders()});
};
