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
        const update = await ChatRoomModel.findOneAndUpdate({_id:chatroom}, {alltasks:arr})
        chatroom1 = await ChatRoomModel.findOne({_id:chatroom}).populate(["roomLead","members","alltasks"])
        let user = await UserModel.findOne({_id:assignee})
        if(assignee==assigner){
            let arr1 = [...user.soloTask]
            arr1.push(task._id)
            let updateUser = await UserModel.findOneAndUpdate({_id:assignee}, {soloTask:arr1})
        } else {
            let arr1 = [...user.mainTask]
            arr1.push(task._id)
            let updateUser = await UserModel.findOneAndUpdate({_id:assignee}, {mainTask:arr1})
        }
        return {
            error:false,
            chatroom1
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
        const update = await ChatRoomModel.findOneAndUpdate({_id:chatroom}, {alltasks:arr})
        const user = await UserModel.findOne({_id:task1.assignee})
        let arr1 = [...user.mainTask]
        arr1 = arr1.filter(ele=>ele!=task)
        const userUpdate = await UserModel.findOneAndUpdate({_id:task1.assignee}, {mainTask:arr1})
        chatroom1 = await ChatRoomModel.findOne({_id:chatroom}).populate(["roomLead","members","alltasks"])
        return {
            error:false,
            chatroom1
        }
    } catch (error) {
        return {
            error:true,
            chatroom:error
        }
    }
}

module.exports = {AddTaskLead, DelTask}