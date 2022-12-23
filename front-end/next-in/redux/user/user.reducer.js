import { GET_USER_REQUEST } from "./user.types";

const initialState = {
    teamData: {}
};

export const teamReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                teamData: {...payload.chatroom}
            }
        }
        default: {
            return state;
        }
    }
};
