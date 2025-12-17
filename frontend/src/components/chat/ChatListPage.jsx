import React, { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import { useSelector } from "react-redux";
import axios from "axios";
import apiConfig from "../endpoint/apiConfig";

const ChatListPage = () => {
  const user1 = useSelector((state) => state.auth.user); // Current logged-in user
  const [users, setUsers] = useState([]); // To store the users and messages
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  // Fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(apiConfig.chat.getlist, {
          userid: user1.id,
        });
        console.log(res.data);

        // Check if the response contains a valid result
        if (res.data.success && Array.isArray(res.data.result)) {
          // Map API result to the required format
          const formattedUsers = res.data.result.map((item) => ({
            id: item.id,
            name: item.username,
            lastMessage: item.lastMessage,
            timestamp: new Date(item.timestamp), // Convert to Date object for sorting
          }));

          // Sort users based on the latest message timestamp
          formattedUsers.sort((a, b) => b.timestamp - a.timestamp); // Most recent message first

          // Update users state
          setUsers(formattedUsers);
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchData();
  }, [user1.id]); // Run when user1's ID changes

  // Function to handle user selection and reset messages
  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side: Chat List */}
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Chats</h2>
        </div>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={`${user.id}-${user.timestamp.toISOString()}`} // Composite key using id + timestamp
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  selectedUser?.id === user.id ? "bg-blue-50" : ""
                }`}
                onClick={() => handleUserClick(user)} // Update the selected user
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {user.timestamp.toLocaleString()} {/* Format the timestamp */}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-gray-500">No chats available.</li>
          )}
        </ul>
      </div>

      {/* Right Side: Chat Window */}
      <div className="flex-1">
        {selectedUser ? (
          <ChatPage selectedUser={selectedUser} currentUser={user1} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
