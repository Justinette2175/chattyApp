import React, {Component} from 'react';
var classNames = require('classnames');

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    let renderedContent;
    let wrapperClasses;
    let colorNumber = this.props.color;
    let usernameClasses = classNames({ [`color${colorNumber}`]: true }, {username : true});
    let content = this.props.content;
    let regEx = /.jpg|.png|.jpeg/;
    renderedContent = [<span className={usernameClasses} key="0">{this.props.username}</span>, <span className="content" id="content" key="1">{this.props.content}</span>]
    if(regEx.test(content)){
      var i = content.indexOf('http');
      var url = content.slice(i);
      var text = content.slice(0, i);
      console.log("image coming!")
      renderedContent.push(
        <div className="image">
          <img src={url}/>
        </div>
      )
    }
    return (
      <div>
        <div className="message">
          {renderedContent}
        </div>
      </div>
    )
  }
}
export default Message;