const ChatRoomModel = require('../model/chatRoom.model')

const NewChatroom = async (lead, name) => {
    try {
        let chatroom = new ChatRoomModel({roomLead:lead, name})
        await chatroom.save()
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
            const update = await ChatRoomModel.findOneAndUpdate({_id:id}, {members:arr})
            const chatroom1 = await ChatRoomModel.findOne({_id:id}).populate(["roomLead","members","alltasks"])
            return {
                error:false,
                chatroom1
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