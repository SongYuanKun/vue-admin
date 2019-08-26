import axios from 'axios';

// let base = 'http://weixin.songyuankun.top/admin';
let base = 'http://localhost:8082/admin';
let headers = {
    'Authorization': sessionStorage.getItem('token')
};

export const getBase = () => {
    return base
};
export const resetHeader = () => {
    headers = {
        'Authorization': sessionStorage.getItem('token')
    };
};
export const requestLogin = params => {
    return axios.post(`${base}/loginByPassword`, params).then(res => res.data);
};

export const getUserInfo = () => {
    return axios.get(`${base}/user`, {headers: headers});
};

export const getUserListPage = params => {
    return axios.post(`${base}/user/page`, {params: params}, {headers: headers});
};

export const editUser = params => {
    return axios.post(`${base}/user/saveOrUpdate`, params, {headers: headers});
};

export const addUser = params => {
    return axios.get(`${base}/user/saveOrUpdate`, {params: params});
};

export const getAppointmentList = params => {
    return axios.post(`${base}/room_appointment/queryAppointmentList`, params, {headers: headers});
};
export const changeStatus = params => {
    return axios.get(`${base}/room_appointment/changeStatus`, {params: params, headers: headers});
};


export const getArticleList = params => {
    return axios.post(`${base}/article/page`, params, {headers: headers});
};

export const fileUpload = params => {
    return axios.post(`${base}/upload/file`, params, {headers: headers});
};
