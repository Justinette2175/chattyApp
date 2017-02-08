import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob", color : 1},
      messages: [],
      connectedUsers: {users: 0}
    };
  }
  //only happens once, once app has been mounted on the browser. So it's a good time to be
  componentDidMount() {

    this.socket  = new WebSocket("ws://localhost:4000");
    this.socket.addEventListener('open', function (event) {
      console.log("Connected to localhost:4000");
    });
    console.log("componentDidMount <App />");
    const messages = this.state.messages
    this.socket.onmessage = (event) => {
      const newMessage = (JSON.parse(event.data));
      console.log(newMessage.type);
      console.log("color"+newMessage.color);
      messages.push(newMessage);
      this.setState({messages: messages, connectedUsers : {users: newMessage.connectedUsers}, currentColor : newMessage.color});
    }
  }

  newMessage(e){
    console.log("pressed a key");
    if (e.keyCode === 13){
      console.log("pressed enter")
      const newMessage = {username: this.state.currentUser.name, content: e.target.value, type:"message", connectedUsers : this.state.connectedUsers.users};
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }

  updateUser(e){
    if (e.keyCode === 13){
      var username = e.target.value;
      var oldUser = this.state.currentUser.name;
      console.log("updating User");
      this.state.currentUser.name = username;
      var notification = {content: `${oldUser} changed their username to ${username}`, type:"message", connectedUsers : this.state.connectedUsers.users}
      this.socket.send(JSON.stringify(notification));
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
      <MessageList messages={this.state.messages} color={this.state.currentColor}/>
      <ChatBar currentUser={this.state.currentUser.name} newMessage = {this.newMessage.bind(this)} updateUser={this.updateUser.bind(this)}/>
      </div>
      );

  }
}

export default App;


