import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        type : String,
        unique : true,
    },
    password : {
        required : true ,
        type : String,
    }
})

const authModel = mongoose.model("User", authSchema)
export default authModel