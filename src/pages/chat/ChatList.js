import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import url from "../../config/defaultUrl.json";
import moment from "moment-timezone";

const ChatList = ({ user }) => {
  const [chatList, setChatList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getChatList = async () => {
      const res = await axios.get(`${url.url}/chatRoom`);
      setChatList(res.data);
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
                {moment(chat.lastUpdate).fromNow()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ChatList);
