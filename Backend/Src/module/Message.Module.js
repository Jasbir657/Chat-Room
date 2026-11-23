import mongoose from "mongoose";

const textSchems = new mongoose.Schema({

    Sender : {
        type : mongoose.Schema.Types.ObjectId,
         ref : "User",
         required : true
        },
    Receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    Text : {
        type : String,
        required : true,
    }

},{timestamps : true})

const Messages = mongoose.model("Messages" , textSchems)
export default Messages