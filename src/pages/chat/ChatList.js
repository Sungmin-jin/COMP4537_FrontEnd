import React, { useEffect, useState, match } from "react";
import { connect } from "react-redux";
import axios from "axios";
import url from "../../config/defaultUrl.json";

const ChatList = ({ user }) => {
  const [chatList, setChatList] = useState([]);
  const [opponents, setOpponents] = useState([]);

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
      {chatList.map((chat) => {
        <div>{chat.chatRoomId}</div>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ChatList);
