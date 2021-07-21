import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    UPDATE_ADDRESS
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addAddress(addressInfo) {
    let body = {
        x: addressInfo.x,
        y: addressInfo.y,
        address_name: addressInfo.address_name,
        nickname: addressInfo.bname
    }

    const request = axios.post(`${USER_SERVER}/inputAddress`, body)
        .then(response => response.data);

    return {
        type: ADD_ADDRESS,
        payload: request
    }
}

export function removeAddress(addressId) {
    let body = {
        id: addressId
    }
    
    const request = axios.get(`${USER_SERVER}/removeAddress`, body)
        .then(response => response.data)

    return {
        type: REMOVE_ADDRESS,
        payload: request
    }
}

export function updateAddress(addressId, update) {
    let body = {
        id: addressId,
        nickname: update
    }

    const request = axios.post(`${USER_SERVER}/updateAddress`, body)
        .then(response => response.data)

    return {
        type: UPDATE_ADDRESS,
        payload: request
    }
}
