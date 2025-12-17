import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import apiConfig from "../endpoint/apiConfig";
import { useSocket } from "../../hooks/useSocket";

const ChatPage = ({ selectedUser, currentUser }) => {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [message, setMessage] = useState(""); // Stores the current message input
  const [isConnected, setIsConnected] = useState(false); // Tracks connection status
  const { notifications } = useSocket();
  const messagesEndRef = useRef(null); // Ref for scroll handling

  // Scroll to the bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle incoming new message notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      if (latestNotification?.type === "NEW_MESSAGE" && latestNotification.from === selectedUser.id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: selectedUser.id, message: latestNotification.message }
        ]);
      }
    }
  }, [notifications, selectedUser.id]);

  // Fetch the chat history when component mounts or when selectedUser changes
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const data = {
          from: currentUser.id,
          to: selectedUser.id,
        };
        const response = await axios.post(apiConfig.chat.getChatHistory, data);
        if (response.data.success && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else {
          console.error("Invalid chat history data:", response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, [selectedUser, currentUser]);

  // Simulate WebSocket connection
  useEffect(() => {
    console.log("Simulating WebSocket connection...");
    setIsConnected(true);
  }, []);

  // Send a message
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const data = {
          from: currentUser.id,
          to: selectedUser.id,
          msg: message
        };
        const response = await axios.post(apiConfig.chat.sendMsg, data);
        console.log("Message sent:", response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      // Add the sent message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: currentUser.id, message }
      ]);
      setMessage(""); // Clear the input after sending
    }
  };

  // Handle pressing the Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  // Message background and alignment based on sender
  const getMessageBackgroundColor = (msg) => {
    return msg.from === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-300 text-black";
  };

  const getMessageAlignment = (msg) => {
    return msg.from === currentUser.id ? "justify-end" : "justify-start";
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-blue-600 shadow-lg">
        <h3 className="text-2xl font-extrabold">{selectedUser.name}</h3>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 p-3 rounded-lg flex ${getMessageBackgroundColor(msg)} ${getMessageAlignment(msg)}`}
            >
              <p className="text-sm">{msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-300">No messages yet. Start chatting!</p>
        )}
        {/* Scroll reference to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-blue-600 shadow-lg">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !message.trim()}
            className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-r-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
