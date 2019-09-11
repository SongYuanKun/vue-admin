import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const saveOrUpdateRecommend = params => {
    return axios.post(`${base}/recommend/saveOrUpdate`, params, {headers: api.getHeaders()});
};

export const updateTop = id => {
    return axios.post(`${base}/recommend/top/` + id, {headers: api.getHeaders()});
};

export const getRecommendInfo = id => {
    return axios.get(`${base}/recommend/info/` + id, {headers: api.getHeaders()});
};
export const deleteById = id => {
    return axios.get(`${base}/recommend/delete/` + id, {headers: api.getHeaders()});
};

export const getRecommendList = params => {
    return axios.post(`${base}/recommend/page`, params, {headers: api.getHeaders()});
};
