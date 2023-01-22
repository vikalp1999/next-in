import { DragDropContext } from "react-beautiful-dnd"
import Chat from "../../components/Chat/Chat.jsx"
import AllUser from "../../components/dashboard/alluser"
import Tasks from "../../components/dashboard/Tasks.jsx"


export default function Dashboard (){

    return(
        <>
            <AllUser />
            <Tasks/>
            <Chat/>
        </>
    )
}

