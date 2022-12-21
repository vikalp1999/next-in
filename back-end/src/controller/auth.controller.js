const UserModel = require("../model/user.model")

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
        const user = await UserModel.findOne({email, password})
        if(!user){
            return {
                error:true,
                msg:'User not found'
            }
        } else {
            delete user.password
            return {
                error:false,
                user:user
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