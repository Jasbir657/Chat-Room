import mongoose from "mongoose";
import config from "./Config.js";

async function connectDB () {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("DB Connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB