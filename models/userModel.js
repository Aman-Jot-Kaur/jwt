const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({

    email: {
        type: String,
        unique:true,
        required: [true, "email is required"]
    }, 
  password: {
        type: String,
        required: [true, "password is required"]
    },
    token:{
        type:String
    }
})
const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel