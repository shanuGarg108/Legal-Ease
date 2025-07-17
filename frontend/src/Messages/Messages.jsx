import React, { useState, useEffect, useRef  } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Body.css";
import axios from "axios";

// Initialize Socket.IO client
const socket = io("http://localhost:5000");

function Messages() {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const storeName = localStorage.getItem("userName");
    setUserName(storeName || "guest");

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${storeName}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();

    const handleMessage = (message) => {
      if (
        message.sender === selectedUser?._id ||
        message.receiver === selectedUser?._id
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    // Listen for incoming messages
    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [selectedUser, currentUser]);



  const fetchMessages = async (user) => {
    if (!currentUser) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/api/messages/${currentUser._id}/${user._id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (!currentUser || !selectedUser || !currentMessage.trim()) return;

    const messageData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message: currentMessage,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setCurrentMessage("");
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
    fetchMessages(user);
  };

  return (
    <div className="container2">
      <header>
      <div className="logo">
          <img
            className="imagelogo"
            src="./Images/icons8-legal-64 (2).png"
            alt="Legalease"
          />
          <div className="legalease">
            <p className="webname">Legal-Ease</p>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>Articles</li>
            <li>Category</li>
          </ul>
        </nav>
        <div className="buttons">
          <button className="login"><Link to="/signup">{userName}</Link></button>
          <button className="profile"><Link to="/Formpage">Create profile</Link></button>
        </div>
      </header>

      <div className="body">
        <ChatsContainer onSelectUser={onSelectUser} currentUser={currentUser} />

        <div className="child messages">
          {selectedUser ? (
            <>
              <div className="chatsection">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={message.sender === currentUser._id ? "user1" : "user2"}
                  >
                    <div
                      className={message.sender === currentUser._id ? "chats1" : "chats2"}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>

              <div className="writingcontainer">
                <input
                  type="text"
                  id="chatbox"
                  placeholder="Message..."
                  autoComplete="off"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="notselected">
              <p>Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatsContainer({ onSelectUser, currentUser }) {
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem("userName");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${username}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [username]);

  return (
    <div className="child chats">
      <p className="chathead">Chat with your Providers</p>
      <div className="users">
        {users.map((user) => (
          <button
            className="user"
            key={user._id}
            onClick={() => onSelectUser(user)}
            disabled={currentUser?._id === user._id}
          >
            <div className="circle"></div>
            <p className="name">{user.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Messages;