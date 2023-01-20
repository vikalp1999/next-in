import { GET_USER_REQUEST, ADD_CHATROOM } from "./user.types";

const initialState = {
    teamData: {}
};

export const teamReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                teamData: {...payload}
            }
        }
        case ADD_CHATROOM: {
            return {
                ...state, 
                teamData:payload
            }
        }
        default: {
            return {
                ...state
            };
        }
    }
};
