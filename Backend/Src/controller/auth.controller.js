import authModel from "../module/Auth.js";

export async function loginController(req , res) {

    try {
        const {email , password } = req.body

        const user = await authModel.findOne({
            email
        })

        if(!user){
           return res.status(400).json({
                message : "User Not Found"
            })
        }

        if(password !== user.password){
            return res.status(500).json({
                message : "Incoorect email or Password"
            })
        }

        const otherUser = await authModel
            .findOne({ _id: { $ne: user._id } })
            .select("_id")

        return res.status(200).json({
            message : "Login SuccesFull",
            user,
            receiverId: otherUser?._id ?? null
        })

    } catch (error) {
        
        console.log(error);
        
        return res.status(400).json({
            message : "Error in Login",
            error
        })
    }
}