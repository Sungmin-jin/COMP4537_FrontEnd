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
      console.log(res.data);
    };
    getChatList();
  }, [user]);

  return (
    <div>
      {chatList.map((chat) => (
        <div
          key={chat.chatRoomId}
          className="chatRoom"
          onClick={() => {
            history.push(`/chatting/${chat.chatRoomId}`);
          }}
        >
          <span>
            {" "}
            {user?.userId === chat.userOneId
              ? chat.userTwoName
              : chat.userOneName}
          </span>
          <span>{chat.lastChat}</span>
          <span>{moment(chat.lastUpdate).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ChatList);
