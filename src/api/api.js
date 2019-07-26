import axios from 'axios';

let base = 'http://localhost:8082';
let headers = {
    'Authorization': sessionStorage.getItem('token')
};
export const requestLogin = params => {
    return axios.post(`${base}/loginByPassword`, params).then(res => res.data);
};

export const getUserList = params => {
    return axios.post(`${base}/user/page`, {params: params}, {headers: headers});
};

export const getUserInfo = () => {
    return axios.get(`${base}/user`, {headers: headers});
};

export const getUserListPage = params => {
    return axios.post(`${base}/user/page`, {params: params}, {headers: headers});
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.post(`${base}/user/saveOrUpdate`,  params, {headers: headers});
};

export const addUser = params => {
    return axios.get(`${base}/user/saveOrUpdate`, {params: params});
};
