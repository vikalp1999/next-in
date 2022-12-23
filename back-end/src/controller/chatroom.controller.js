const ChatRoomModel = require('../model/chatRoom.model')
const UserModel = require('../model/user.model')

const NewChatroom = async (lead, name) => {
    try {
        let chatroom = await ChatRoomModel.create({roomLead:lead, name})
        let user = await UserModel.findByIdAndUpdate(lead, {$set: {currentChatroom:chatroom._id}}, {new:true})
        chatroom = await ChatRoomModel.findById(chatroom._id).populate("roomLead")
        let user1 = await UserModel.findByIdAndUpdate(lead, {currentChatroom:chatroom._id, role:'admin'})
        return {
            error:false,
            chatroom,
            code:chatroom._id
        }
    } catch (error) {
        return {
            error:true,
            msg:error
        }
    }
}

const JoinChatroom = async (user, id) => {
    try {
        const chatroom = await ChatRoomModel.findOne({_id:id})
        if(chatroom){
            let arr = [...chatroom.members]
            if(arr.includes(user) || chatroom.roomLead==user){
                return {
                    error:true,
                    msg:'User already present in this chat room'
                }
            }
            arr.push(user)
            let upUser = await UserModel.findByIdAndUpdate(user, {currentChatroom:chatroom._id})
            const update = await ChatRoomModel.findByIdAndUpdate(
                id,
                { $set: { members:arr } },
                { new: true }
            ).populate(["members", "roomLead", "alltasks", {path:"members", populate:{path:"soloTask"}}, {path:"members", populate:{path:"mainTask"}}, "messages" ])
            
            return {
                error:false,
                chatroom:update
            }
        } else {
            return {
                error:true,
                msg:'Invalid invite code'
            }
        }
    } catch (error) {
        return {
            error:true,
            msg:error
        }
    }
}

const GetChatroom = async (id)=> {
    try {
        const update = await 
        ChatRoomModel.findById(id)
        .populate(["members", "roomLead", {path:"alltasks",populate:{path:"assignee"}}, {path:"members", populate:{path:"soloTask"}}, {path:"members", populate:{path:"mainTask"}}, "messages" ])

        if(update) {
            return {
                error:false, 
                chatroom:update
            }
        } else {
            return {
                error:true, 
                msg:"Chatroom not found"
            }
        }
    } catch (error) {
        return {
                error:true, 
                msg:error
            }
    }
}

module.exports = {NewChatroom, JoinChatroom, GetChatroom}