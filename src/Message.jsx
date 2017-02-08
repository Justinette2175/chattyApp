import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    let extraMsgClass = "";
    let content;
    let colorClass = `color${this.props.color}`
    console.log(this.props.color);
    if (this.props.type === "message"){
      content = [<span className={colorClass} key="0">{this.props.username}</span>, <span className="content" id="content" key="1">{this.props.content}</span>]
    }
    else if (this.props.type === "postNotification"){
      extraMsgClass = "system";
      content = <span key="3">{this.props.content}</span>
    }
    return (
      <div>
        <div className="message {extraMsgClass}">
          {content}
        </div>
      </div>
    )
  }
}
export default Message;