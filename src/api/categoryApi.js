import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const saveOrUpdateArticle = params => {
    return axios.post(`${base}/article/saveOrUpdate`, params, {headers: api.getHeaders()});
};
export const getArticleList = params => {
    return axios.post(`${base}/article/page`, params, {headers: api.getHeaders()});
};
