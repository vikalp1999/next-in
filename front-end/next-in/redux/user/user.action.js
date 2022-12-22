import axios from "axios";
import { GET_USER_REQUEST } from "./user.types";

let API = process.env.NEXT_PUBLIC_API_LINK;
export const teamAction = (id) => async (dispatch) => {
    // console.log("id",id)
    try {
        const res = await axios.get(`${API}/chatroom/${id}`);
        const data = await res.data;
        console.log("data",data)
        dispatch({ type: GET_USER_REQUEST, payload: data })
    } catch (error) {
        console.log(error.message)
    }
};