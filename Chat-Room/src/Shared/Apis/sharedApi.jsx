import api from "../../Config/Api";


export const sendMessageApi = (senderId, receiverId, message) =>
    api.post("/messages", {
        sender: senderId,
        receiver: receiverId,
        text: message
    });

export const fetchMessagesApi = (senderId, receiverId) =>
    api.get("/fetchMessages", {
        params: {
            sender: senderId,
            receiver: receiverId
        }
    });