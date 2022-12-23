const TaskModel = require('../model/task.model')
const ChatRoomModel = require('../model/chatRoom.model')
const UserModel = require('../model/user.model')

const AddTaskLead = async (title, deadline, assigner, assignee, chatroom) => {
    try {
        const task = new TaskModel({title, deadline, assigner, assignee})
        await task.save()
        let chatroom1 = await ChatRoomModel.findOne({_id:chatroom})
        let arr = [...chatroom1.alltasks]
        arr.push(task._id)
        const update = await ChatRoomModel.findByIdAndUpdate(
            chatroom,
            { $set: { alltasks:arr } },
            { new: true }
        ).populate(["members", "roomLead", "alltasks", {path:"members", populate:{path:"soloTask"}}, {path:"members", populate:{path:"mainTask"}}, ])
        let user = await UserModel.findOne({_id:assignee})
        if(assignee==assigner){
            let arr1 = [...user.soloTask]
            arr1.push(task._id)
            const update = await ChatRoomModel.findByIdAndUpdate(
                assignee,
                { $set: { soloTask:arr1 } },
                { new: true }
            )
        } else {
            let arr1 = [...user.mainTask]
            arr1.push(task._id)
            const update = await ChatRoomModel.findByIdAndUpdate(
                assignee,
                { $set: { soloTask:arr1 } },
                { new: true }
            )
        }
        return {
            error:false,
            chatroom:update
        }
    } catch (error) {
        return {
            error:true,
            msg:error
        }
    }
}

const DelTask = async (task, chatroom) => {
    try {
        const task1 = await TaskModel.findOneAndDelete({_id:task})
        let chatroom1 = await ChatRoomModel.findOne({_id:chatroom})
        let arr = [...chatroom1.alltasks]
        arr = arr.filter(ele=>ele!=task)
        const update = await ChatRoomModel.findByIdAndUpdate(
            chatroom,
            { $set: { alltasks:arr } },
            { new: true }
        ).populate(["members", "roomLead", "alltasks", {path:"members", populate:{path:"soloTask"}}, {path:"members", populate:{path:"mainTask"}}, ])
        const user = await UserModel.findOne({_id:task1.assignee})
        let arr1 = [...user.mainTask]
        arr1 = arr1.filter(ele=>ele!=task)
        const userUpdate = await UserModel.findOneAndUpdate({_id:task1.assignee}, {mainTask:arr1})
        return {
            error:false,
            chatroom:update
        }
    } catch (error) {
        return {
            error:true,
            chatroom:error
        }
    }
}


 const updateTask= async(req,res)=>{
    const id= req.params.id;
    const {changestatus}=req.body
    const task = await TaskModel.findByIdAndUpdate(
        id,
        { $set: { status: changestatus  } },
        { new: true }
    ) ;
    res.status(200).send(task)
}

module.exports = {AddTaskLead, DelTask, updateTask}