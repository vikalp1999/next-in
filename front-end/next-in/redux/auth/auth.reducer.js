import { AUTH_ERROR, AUTH_LOGIN_SUCCESS, AUTH_REGISTER_SUCCESS } from "./auth.types";

const initialState = {
    isRegistered: false,
    isAuth: false,
    userData: {},
    isError: false
};

export const authReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case AUTH_REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistered: true,
                isError: false,
                isAuth: false,
                userData: payload
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                isError: false,
                userData: payload
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                isRegistered: false,
                isAuth: false,
                isError: true,
            };
        }
        default: {
            return state;
        }
    }
};
