const UserModel = require("../model/user.model")
const jwt= require("jsonwebtoken")
const AuthSignup = async (email, password, name) => {
    try {
        const user = await UserModel.findOne({email})
        if(user){
            return {
                error:true,
                msg:'Email already registered'
            }
        } else {
            const newUser = new UserModel({email, password, name})
            await newUser.save()
            return {
                error:false,
                user:newUser
            }
        }
    } catch (error) {
        return {
            error:true,
            msg:error
        }
    }
}

const AuthLogin = async (email, password)=>{
    try {
        const user = await UserModel.findOne({email, password}).populate(["mainTask","soloTask", "currentChatroom"])
        if(!user){
            return {
                error:true,
                msg:'User not found'
            }
        } else {
            delete user.password
            const token= jwt.sign({
                ...user
            },"VIKALP@99",{
                expiresIn:"7 days"
            })
            const refreshToken=jwt.sign({id:user._id},"REFRESHSECRET",{
                expiresIn:"28 days"
            })
            return {
                error:false,
                user:user,
                token,
                refreshToken
            }
        }
    } catch (error) {
        return {
            error:true,
            msg:error
        }
    } 
}

module.exports = {AuthSignup, AuthLogin}