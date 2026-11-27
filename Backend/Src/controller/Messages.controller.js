import Messages from "../module/Message.Module.js";

export const saveMessages = async(req , res) => {
    try {
        const savedMessage = await Messages.create({
            Sender : req.body.sender,
            Receiver : req.body.receiver,
            Text : req.body.text
        })

        return res.status(201).json({
            success: true,
            data: {
                _id: savedMessage._id,
                sender: savedMessage.Sender,
                receiver: savedMessage.Receiver,
                text: savedMessage.Text,
                createdAt: savedMessage.createdAt
            }
        })

    } catch (error) {
        const status = error.name === "ValidationError" || error.name === "CastError"
            ? 400
            : 500

        return res.status(status).json({
            success: false,
            message: error.message
        })
    }
}

export const fetchMessages = async(req , res)=>{

    try {

        const {sender , receiver} = req.query

        if (!sender || !receiver) {
            return res.status(400).json({
                success: false,
                message: "Sender and receiver are required."
            })
        }

        const messages = await Messages.find({
            $or:[
                {Sender: sender, Receiver: receiver},
                {Sender: receiver, Receiver: sender}
            ]
        }).sort({createdAt : -1}).limit(30)

        return res.status(200).json({
            success: true,
            messages: messages.map((message) => ({
                _id: message._id,
                sender: message.Sender,
                receiver: message.Receiver,
                text: message.Text,
                createdAt: message.createdAt
            }))
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}
