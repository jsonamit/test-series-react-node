

import { userActionTypes } from '../../../constants/Actions';

let initialState = {
    id: null,
    name: '',
    email: '',
    mobile: '',
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const userReducers = (state = initialState,{ type,payload }) => {
    switch(type) {
        case userActionTypes.SET_USER : 
            return {
                ...state,
                loading: false,
                error: null,
                isAuthenticated: true,
                id: payload.id,
                token: payload.token,
                name: payload.name,
                email: payload.email,
                mobile: payload.mobile,
            };

        case userActionTypes.GET_USER : 
            return {...state};

        case userActionTypes.UPDATE_USER : 
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: payload.token,
                name: payload.name,
                email: payload.email,
                mobile: payload.mobile
            };

        case userActionTypes.LOGOUT_USER : 
            return {
                ...state,
                loading: false,
                error: null,
                isAuthenticated: false,
                token: '',
                name: '',
                email: '',
                mobile: '',
                id: null,
            };

        default : 
            return state
    }
}