import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    UPDATE_ADDRESS,
    SET_CURRENT_ADDRESS,
    SAVE_FAVORITE,
    REMOVE_FAVORITE,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
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
    
    const request = axios.post(`${USER_SERVER}/removeAddress`, body)
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

export function setCurrentAddress(addressInfo) {
    let body = {
        nickname: addressInfo.nickname,
        address_name: addressInfo.address_name,
        x: addressInfo.x,
        y: addressInfo.y
    }

    const request = axios.post(`${USER_SERVER}/setCurrent`, body)
        .then(response => response.data)

    return {
        type: SET_CURRENT_ADDRESS,
        payload: request
    }
}

export function saveFavorite(favoriteId) {
    let body = {
        favorite: favoriteId
    }

    const request = axios.post(`${USER_SERVER}/saveFavorite`, body)
        .then(response => response.data)

    return {
        type: SAVE_FAVORITE,
        payload: request
    }
}

export function removeFavorite(favoriteId) {
    let body = {
        favorite: favoriteId
    }

    const request = axios.post(`${USER_SERVER}/removeFavorite`, body)
        .then(response => response.data)

    return {
        type: REMOVE_FAVORITE,
        payload: request
    }
}

export function addToCart(productId, productCount) {
    let body = {
        productId: productId,
        productCount: productCount
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data)

    return {
        type: ADD_TO_CART,
        payload: request
    }    
}

export function getCartItems(cartItems, userCart) {                                         // 1. client에서 받음

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)     // 2. 라우터로 보냄
        .then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId){
    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {
             //productInfo , cart 정보를 조합해서 CartDetail을 만든다. 
             response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })

            return response.data
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}
