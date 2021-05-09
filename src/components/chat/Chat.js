import React from 'react';
import './chat.css';
import moment from 'moment';

const Chat = ({ own, chat }) => {
  return (
    <div className={own ? 'chat own' : 'chat'}>
      <div className="chatTop">Sungmin Jin</div>
      <div className="chatMiddle">
        <p className="chatText">{chat.chatText}</p>
      </div>
      <div className="chatBottom">
        <span>{moment(chat.chatDate).fromNow()}</span>
      </div>
    </div>
  );
};

export default Chat;
