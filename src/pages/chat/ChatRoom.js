import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import url from "../../config/defaultUrl.json";
import "./chatRoom.css";
import Chat from "../../components/chat/Chat";
import { connect } from "react-redux";
import axios from "axios";

const ChatRoom = ({ match, user }) => {
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalChat, setArrivalChat] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    const getOpponent = async () => {
      const res = await axios.get(`${url.url}/chatRoom/${user.userId}`);
      const { userOne, userTwo } = res;
      const user = await axios.get(
        `${url.url}/user/${userOne === user.userId ? userTwo : userOne}`
      );
      setOpponent(user);
    };
    getOpponent();

    socket.current = io("ws://localhost:8900");
    socket.current.on("getChat", (data) => {
      const ts = Math.round(new Date().getTime() / 1000);
      const newTs = ts - 7 * 3600;
      setArrivalChat({
        senderId: data.senderId,
        chatText: data.text,
        chatDate: newTs,
      });
    });
  }, []);

  useEffect(() => {
    arrivalChat && setChats((prev) => [...prev, arrivalChat]);
  }, [arrivalChat]);

  useEffect(() => {
    socket.current.emit("join", user?.userId);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  useEffect(() => {
    const getChats = async () => {
      const res = await axios.get(`${url.url}/chat/${match.params.id}`);
      setChats(res.data);
    };
    getChats();
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const messageSend = async (e) => {
    e.preventDefault();
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
      console.log("from chatroom", res.data);
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
              <div ref={scrollRef} key={chat.chatId}>
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
