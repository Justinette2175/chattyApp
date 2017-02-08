import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageLists/>");
    var messageItems = this.props.messages.map(function(item){
      console.log(item.color);
        return <Message username={item.username} content={item.content} key= {item.id} type={item.type} color={item.color}/>
    })
    return (
      <div id="message-list">
        {messageItems}
      </div>
    );
  }
}
export default MessageList;

