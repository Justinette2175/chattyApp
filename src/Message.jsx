import React, {Component} from 'react';
var classNames = require('classnames');

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    let renderedContent;
    let wrapperClasses;
    let colorNumber = this.props.color;
    console.log(this.props.color);
    if (this.props.type === "message"){
      wrapperClasses = classNames({ message: true }, { system: false });
      let usernameClasses = classNames({ [`color${colorNumber}`]: true }, {username : true});
      let content = this.props.content;
      let regEx = /.jpg|.png|.jpeg/;
      renderedContent = [<span className={usernameClasses} key="0">{this.props.username}</span>, <span className="content" id="content" key="1">{this.props.content}</span>]
      if(regEx.test(content)){
        console.log("image coming!")
        renderedContent.push(
          <div className="image">
            <img src={content}/>
          </div>
        )
      }
    }
    else if (this.props.type === "notification"){
      wrapperClasses = classNames({ message: true }, { system: true });
      renderedContent = <span key="3">{this.props.content}</span>
    }
    console.log(renderedContent);
    return (
      <div>
        <div className={wrapperClasses}>
          {renderedContent}
        </div>
      </div>
    )
  }
}
export default Message;