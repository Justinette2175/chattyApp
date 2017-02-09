import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageLists/>");
    console.log(this.props.messages);
    var messageItems = this.props.messages.map(function(item){
        switch (item.type){
          case "message":
            return <Message username={item.username} content={item.content} key= {item.id} type={item.type} color={item.color}/>
            break;
          case "notification":
            return <Notification content={item.content} key= {item.id} type={item.type}/>
            break;
        }
    })
    return (
      <div id="message-list">
        {messageItems}
      </div>
    );
  }
}
export default MessageList;

