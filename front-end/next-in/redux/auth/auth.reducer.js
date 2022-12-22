import { AUTH_LOGIN_SUCCESS, AUTH_REGISTER_SUCCESS } from "./auth.types";

const initialState = {
    isRegistered: false,
    isAuth: false,
    userData: {}
};

export const authReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case AUTH_REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistered: true,
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                userData: payload
            };
        }
        default: {
            return state;
        }
    }
};
