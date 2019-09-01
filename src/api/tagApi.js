import * as api from './api';
import axios from 'axios';

let base = api.getBase();

export const saveOrUpdateTag = params => {
    return axios.post(`${base}/tag/saveOrUpdate`, params, {headers: api.getHeaders()});
};
export const getTagList = params => {
    return axios.post(`${base}/tag/page`, params, {headers: api.getHeaders()});
};

export const selectTag = type => {
    return axios.get(`${base}/tag/select?type=` + type, {headers: api.getHeaders()});
};

export const getTagInfo = id => {
    return axios.get(`${base}/tag/info/` + id, {headers: api.getHeaders()});
};
export const deleteTag = id => {
    return axios.get(`${base}/tag/delete/` + id, {headers: api.getHeaders()});
};
