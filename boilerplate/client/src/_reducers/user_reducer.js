import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    UPDATE_ADDRESS,
    SET_CURRENT_ADDRESS
} from '../_actions/types';
 

export default function(state={}, action){
    switch(action.type){
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case ADD_ADDRESS:
            return { ...state, 
                userData: {
                    ...state.userData,
                    address: action.payload.userInfo.address
                }
            }
        case REMOVE_ADDRESS:
            return { ...state, 
                userData: {
                    ...state.userData,
                    address: action.payload.userInfo.address
                }
            }
        case UPDATE_ADDRESS:
            return { ...state, 
                userData: {
                    ...state.userData,
                    address: action.payload.userInfo.address
                }
            }
        case SET_CURRENT_ADDRESS:
            return { ...state,
                userData: {
                    ...state.userData,
                    currentAddress: action.payload.currentAddress
                }
            }
        default:
            return state;
    }
}