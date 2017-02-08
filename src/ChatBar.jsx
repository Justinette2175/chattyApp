import React, {Component} from 'react';



class ChatBar extends Component {

  render() {
    console.log("Rendering <ChatBar/>");
    return (
    <footer>
      <form onSubmit={this.handleSubmit}>
        <input id="username" type="text" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onKeyUp={this.props.updateUser} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.props.newMessage}/>
      </form>
    </footer>
    );
  }
}


export default ChatBar;


