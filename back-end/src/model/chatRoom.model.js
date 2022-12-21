const mongoose = require("mongoose");


const chatRoomSchema= mongoose.Schema({
   roomLead:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
   },
   members:{
    type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
   },
   alltask:{
    type:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task" 
    }]
   }
   
})

const ChatRoomModel= mongoose.model("chatroom",chatRoomSchema);
module.exports=ChatRoomModel