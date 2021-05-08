import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import url from "../../config/defaultUrl.json";
import "./chatRoom.css";
import Chat from "../../components/chat/Chat";
import { connect } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ChatRoom = ({ match, user }) => {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalChat, setArrivalChat] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(url.endPoint);
    socket.current.on("getChat", (data) => {
      var date = new Date(Date.now());
      setArrivalChat({
        senderId: data.senderId,
        chatText: data.chatText,
        chatDate: date,
      });
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      const res = await axios.get(`${url.url}/chat/${match.params.id}`);
      setChats(res.data);
    };

    const getOpponent = async () => {
      const res = await axios.get(`${url.url}/chatRoom/${match.params.id}`);
      const { userOne, userTwo } = res.data;

      const opponent = await axios.get(
        `${url.url}/user/${userOne === user?.userId ? userTwo : userOne}`
      );
      setOpponent(opponent.data);
    };

    if (user) {
      getOpponent();

      getChats();
      socket.current.emit("join", user?.userId);
      socket.current.on("getUsers", (users) => {});
    }
  }, [user]);

  useEffect(() => {
    const setChat = async () => {
      arrivalChat && (await setChats([...chats, arrivalChat]));
    };
    setChat();
  }, [arrivalChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const messageSend = async (e) => {
    e.preventDefault();
    setNewMessage("");
    const message = {
      senderId: user.userId,
      chatText: newMessage,
      chatRoomId: match.params.id,
    };
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    socket.current.emit("sendChat", {
      senderId: user.userId,
      receiverId: opponent.userId,
      chatText: newMessage,
    });
    try {
      const res = await axios.post(`${url.url}/chat`, message, config);
      setChats([...chats, res.data]);
    } catch (error) {}
  };

  if (!user) {
    return <div>user not found</div>;
  }

  return (
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          {chats.length !== 0 ? (
            chats.map((chat) => (
              <div ref={scrollRef} key={uuidv4()}>
                <Chat chat={chat} own={chat.senderId === user.userId} />
              </div>
            ))
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat
            </span>
          )}
        </div>
        <div className="chatBoxBottom">
          <textarea
            placeholder="message here"
            className="chatMessageInput"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="chatSubmitButton" onClick={messageSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ChatRoom);
