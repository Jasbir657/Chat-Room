import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, MoreVertical, MessageCircle } from "lucide-react";
import { useSelector } from "react-redux";
import socket from "../../../Socket/Socket";
import { fetchMessagesApi, sendMessageApi } from "../../Apis/sharedApi";

const getMessageText = (msg) => {
    if (typeof msg?.text === "string") return msg.text;
    if (typeof msg?.Text === "string") return msg.Text;
    return "";
};

const ChatPage = () => {

    const [inpValue, setInpValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [sendError, setSendError] = useState("");
    const messagesEndRef = useRef(null);
    const senderId = useSelector((state) => state.auth.user?._id);
    const receiverId = useSelector((state) => state.auth.receiverId);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            block: "nearest",
            behavior: "smooth"
        });
    }, [messages]);

    // Send Message
    const handleSendMessage = async () => {

        if (!inpValue.trim()) return;
        if (!senderId || !receiverId) {
            setSendError("A second user account is required to send messages.");
            return;
        }

        const text = inpValue.trim();

        try {

            // Save message in MongoDB through API
            const res = await sendMessageApi(
                senderId,
                receiverId,
                text
            );

            if (!res) return;

            setSendError("");
            // Add message to frontend
            setMessages((prev) => [
                ...prev,
                res.data.data
            ]);

            // Send message through Socket.IO
            socket.emit("message", {
                _id: res.data.data._id,
                sender: senderId,
                receiver: receiverId,
                text: text
            });

            setInpValue("");

        } catch (error) {
            setSendError(
                error.response?.data?.message || "Failed to send message."
            );
        }
    };

    // Socket Connection
    useEffect(() => {

        if (!senderId || !receiverId) return;

        const loadMessages = async () => {
            try {
                const res = await fetchMessagesApi(senderId, receiverId);
                const storedMessages = res.data?.messages ?? [];
                setMessages(storedMessages);
                setSendError("");
            } catch (error) {
                setSendError(
                    error.response?.data?.message || "Failed to load messages."
                );
            }
        };

        const joinUserRoom = () => {
            socket.emit("join", String(senderId));
        };

        const handleIncomingMessage = (msg) => {

            if (!msg || typeof msg !== "object") return;

            // Avoid adding your own message twice
            if (String(msg.sender) === String(senderId)) return;

            setMessages((prev) => {
                const incomingText = getMessageText(msg);
                const incomingId = msg._id ? String(msg._id) : null;

                const alreadyExists = prev.some((existing) =>
                    incomingId
                        ? String(existing._id) === incomingId
                        : String(existing.sender) === String(msg.sender)
                            && getMessageText(existing) === incomingText
                );

                if (alreadyExists) return prev;

                return [
                    ...prev,
                    {
                        ...msg,
                        text: incomingText
                    }
                ];
            });
        };

        socket.on("connect", joinUserRoom);
        socket.on("message", handleIncomingMessage);
        loadMessages();
        socket.connect();
        joinUserRoom();

        return () => {
            socket.off("connect", joinUserRoom);
            socket.off("message", handleIncomingMessage);
            socket.disconnect();
        };

    }, [senderId, receiverId]);

    const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

    return (
        <div className="h-screen bg-[#0b1120] text-white flex items-center justify-center p-4">

            <div className="w-full max-w-5xl h-[90vh] bg-[#111827] border border-gray-800 rounded-2xl flex overflow-hidden">

                {/* Sidebar */}
                <div className="hidden md:flex w-72 border-r border-gray-800 flex-col">

                    <div className="p-5 border-b border-gray-800">
                        <h1 className="text-xl font-bold">Messages</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Your conversations
                        </p>
                    </div>

                    <div className="p-4">
                        <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl flex items-center gap-3">

                            <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center">
                                <MessageCircle />
                            </div>

                            <div>
                                <h3 className="font-semibold text-sm">
                                    Support Team
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Online now
                                </p>
                            </div>

                        </div>
                    </div>

                </div>


                {/* Chat Area */}
                <div className="flex-1 min-h-0 flex flex-col">

                    {/* Header */}
                    <div className="h-20 px-5 border-b border-pink-800 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 bg-pink-600 rounded-full flex items-center justify-center">
                                <MessageCircle />
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    Support Team
                                </h2>

                                <p className="text-xs text-green-400">
                                    Online
                                </p>
                            </div>

                        </div>

                        <MoreVertical className="text-gray-400 cursor-pointer" />

                    </div>


                    {/* Messages */}
                    <div className="flex-1 min-h-0 p-5 overflow-y-auto space-y-4 scroll-smooth">

                        <p className="text-center text-xs text-gray-600">
                            TODAY
                        </p>

                        {messages.map((msg, index) => (

                            <div
                                key={msg._id || index}
                                className={`flex ${
                                    String(msg.sender) === String(senderId)
                                        ? "justify-end pb-2"
                                        : "justify-start pb-2"
                                }`}
                            >

                                <div
                                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                                        String(msg.sender) === String(senderId)
                                            ? "bg-pink-600 text-white rounded-br-sm"
                                            : "bg-pink-800 text-gray-200 rounded-bl-sm"
                                    }`}
                                >
                                    <div className="flex flex-col">
                                        {getMessageText(msg)}
                                     <span className="text-xs text-gray-400 self-end">
                                     {formatTime(msg.createdAt)}
                                    </span>
                                    </div>
                                    
                                </div>
                               

                            </div>

                        ))}
                        <div ref={messagesEndRef} />

                    </div>


                    {/* Input */}
                    <div className="p-4 border-t border-gray-800">

                        {sendError && (
                            <p className="mb-2 text-sm text-red-400" role="alert">
                                {sendError}
                            </p>
                        )}

                        <div className="flex items-center gap-3 bg-[#1f2937] rounded-xl px-4 py-2">

                            <Paperclip
                                size={20}
                                className="text-gray-500 cursor-pointer"
                            />

                            <textarea
                                type="text"
                                value={inpValue}
                                onChange={(e) => setInpValue(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleSendMessage()
                                }
                                placeholder="Type your message..."
                                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 py-2"
                            />

                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 hover:bg-blue-500 p-2.5 rounded-lg transition"
                            >
                                <Send size={17} />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ChatPage;