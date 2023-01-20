import axios from "axios";
import { ADD_CHATROOM, GET_USER_REQUEST } from "./user.types";

let API = process.env.NEXT_PUBLIC_API_LINK;

export const teamAction = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/chatroom/${id}`);
        const data = await res.data;
        dispatch({ type: GET_USER_REQUEST, payload: data.chatroom })
    } catch (error) {
        console.log(error.message)
    }
};

export const AddChatroom = (chatroom) => {
    return {
        type:ADD_CHATROOM,
        payload:chatroom
    }
}

export const deleteTaskAction = (task, chatroom) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/task/deltask`, {
            task,
            chatroom
        });
        const data = await res.data;
        dispatch(teamAction(chatroom))
    } catch (error) {
        console.log(error.message)
    }
};

export const updateTaskAction = (id, changestatus,chatroom) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/task/updatestatus/${id}`, {
            changestatus
        });
        const data = await res.data;
        dispatch(teamAction(chatroom))
    } catch (error) {
        console.log(error.message)
    }
};