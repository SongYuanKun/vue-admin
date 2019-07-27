import axios from 'axios';

let base = 'http://localhost:8082/admin';
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

export const editUser = params => {
    return axios.post(`${base}/user/saveOrUpdate`, params, {headers: headers});
};

export const addUser = params => {
    return axios.get(`${base}/user/saveOrUpdate`, {params: params});
};


export const getAppointmentList = params => {
    return axios.get(`${base}/room_appointment/queryAppointmentList`, {params: params, headers: headers});
};
