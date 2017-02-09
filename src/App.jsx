import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      connectedUsers: {users: 0},
      sessionColor : ""
    };
  }
  //only happens once, once app has been mounted on the browser. So it's a good time to be

  scrollToBottom(){
    document.body.scrollTop = document.body.scrollHeight - document.body.clientHeight;
  }

  componentDidMount() {
    this.socket  = new WebSocket("ws://localhost:4000");
    this.socket.addEventListener('open', function (event) {
      console.log("Connected to localhost:4000");
    });
    console.log("componentDidMount <App />");
    const messages = this.state.messages;
    this.socket.onmessage = (event) => {
      const message = (JSON.parse(event.data));
      switch(message.type){
        case "connectedUsers":
          this.setState({connectedUsers : {users: message.connectedUsers}});
          break;
        case "message":
        case "notification":
          messages.push(message);
          this.setState({messages: messages});
          this.scrollToBottom();
          break;
        case "colorSet":
          let color = message.color;
          this.setState({sessionColor:color})
          break;
      }
    }
  }

  newMessage(e){
    console.log("pressed a key");
    if (e.keyCode === 13){
      console.log("pressed enter")
      const newMessage = {username: this.state.currentUser.name, color:this.state.sessionColor, content: e.target.value, type:"message", connectedUsers : this.state.connectedUsers.users};
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }

  blurUser(e){
    var username = e.target.value || "anonymous";
    var oldUser = this.state.currentUser.name;
    console.log("updating User");
    this.state.currentUser.name = username;
    var notification = {content: `${oldUser} changed their username to ${username}`, type:"notification", connectedUsers : this.state.connectedUsers.users}
    this.socket.send(JSON.stringify(notification));
  }

  updateUser(e){
    if (e.keyCode === 13){
      this.blurUser(e);
    }
  }

  render() {
      console.log("rendering app");
      return (
        <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span className = "connected-users">Connected users : {this.state.connectedUsers.users}</span>
        </nav>
      <MessageList messages={this.state.messages} color={this.state.sessionColor}/>
      <ChatBar currentUser={this.state.currentUser.name} newMessage = {this.newMessage.bind(this)} updateUser={this.updateUser.bind(this)} blurUser={this.blurUser.bind(this)}/>
      </div>
      );

  }
}

export default App;


