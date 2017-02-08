import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
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
      console.log(this.state.currentUser.name);
      messages.push(newMessage);
      this.setState({messages: messages});
    }
  }

  newMessage(e){
    console.log("pressed a key");
    if (e.keyCode === 13){
      console.log("pressed enter")
      const newMessage = {username: this.state.currentUser.name, content: e.target.value};
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }

  updateUser(e){
    var user = e.target.value;
    console.log("updatingUser");
    this.state.currentUser.name = user;
  }

  render() {
      console.log("rendering app");
      return (
        <div className="wrapper">
        <nav>
        <h1>Chatty</h1>
        </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} newMessage = {this.newMessage.bind(this)} updateUser={this.updateUser.bind(this)}/>
      </div>
      );

  }
}

export default App;


