const ChatRoomModel = require('../model/chatRoom.model')

const NewChatroom = async (lead, name) => {
    try {
        let chatroom = await ChatRoomModel.create({roomLead:lead, name})
        chatroom = await ChatRoomModel.findById(chatroom._id).populate("roomLead")
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
            const update = await ChatRoomModel.findByIdAndUpdate(
                id,
                { $set: { members:arr } },
                { new: true }
            ).populate(["members", "roomLead", "alltasks", {path:"members", populate:{path:"soloTask"}}, {path:"members", populate:{path:"mainTask"}}, ])
            
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

module.exports = {NewChatroom, JoinChatroom}