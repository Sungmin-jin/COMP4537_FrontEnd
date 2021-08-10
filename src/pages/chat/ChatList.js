import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import url from "../../config/defaultUrl.json";
import moment from "moment-timezone";

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const history = useHistory();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    const getChatList = async () => {
      const res = await axios.get(`${url.url}/chatRoom`);
      setChatList(res.data);
      console.log(res.data);
    };
    getChatList();
  }, [user]);

  return (
    <>
      <div className="chatroom-header">
        <h1 className="chat-heading-primary">
          <span className="user-heading-primary-main">Kreamin Studio</span>
        </h1>
      </div>
      <div className="chatlist-container">
        {chatList.map((chat) => (
          <div
            key={chat.chatRoomId}
            className="chatRoom"
            onClick={() => {
              history.push(`/chatting/${chat.chatRoomId}`);
            }}
          >
            <div className="chat-person">
              <span>{chat.lastChat}</span>
            </div>
            <div className="chat-text">
              <span className="chat-name">
                {user?.userId === chat.userOneId
                  ? chat.userTwoName
                  : chat.userOneName}
              </span>
              <span className="chat-time">
                {chat.chatUpdate ? `${moment(chat.lastUpdate).fromNow()}` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


export default ChatList;
