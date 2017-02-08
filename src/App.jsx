import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      currentId : 2,
      currentUser : {name : "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id : 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id : 2
        }
      ],

    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: this.state.currentId+=1, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  newMessage(e){
    console.log("pressed a key")
    if (e.keyCode === 13){
      console.log("pressed enter")
      this.state.currentId += 1;
      const newMessage = {id: this.state.currentId+=1, username: this.state.currentUser.name, content: e.target.value};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages});
      e.target.value = "";
    }
  }

  render() {
      console.log("rendering app");
      return (
        <div className="wrapper">
        <nav>
        <h1>Chatty</h1>
        </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} newMessage = {this.newMessage.bind(this)}/>
      </div>
      );

  }
}

export default App;


