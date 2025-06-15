import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    password: {
        type : String,
        required :true
    },
    email:{
        type:String,
        required:true,
        unique :true
    },
    cartItems: {
        type:Object,
        default :{}
    },
},{minimize:false})

const User =mongoose.models.userN ||  mongoose.model('userN',userSchema)

export default User