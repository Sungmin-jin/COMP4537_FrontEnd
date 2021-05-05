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
      //   const fetchedOpponents = []
      //   for(let user of res.data) {
      //       const res2 = axios.get(`${url.url}/user/${use?.userId === userOne.userId}`)
      //   }
    };
    getChatList();
  }, [user]);
  return <div></div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ChatList);
